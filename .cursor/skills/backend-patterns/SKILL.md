---
name: backend-patterns
description: Backend architecture patterns for ZironTap — oRPC, Drizzle, Valkey, Better Auth, Inngest, rate-limiting, and structured logging.
origin: ECC
---

# Backend Development Patterns (ZironTap Stack)

Backend architecture patterns for the ZironTap monorepo: oRPC with OpenAPI, Drizzle + Postgres, Valkey (Redis), Better Auth, Inngest, rate-limiter-flexible, and Pino/Winston logging.

## When to Activate

- Designing oRPC procedures, routers, or OpenAPI-compatible routes
- Implementing middleware (auth, rate-limit, db, errors), context, or contracts
- Writing Drizzle schema, queries, transactions, or migrations for Postgres
- Caching with Valkey (Redis) — sessions, org metadata, redirects
- Integrating Better Auth with Redis session store
- Background jobs with Inngest
- Error handling (Zod + oRPC errors)
- Rate limiting with rate-limiter-flexible
- Structured logging with Pino or Winston

## Tech Stack Summary

| Layer      | Technology                          |
| ---------- | ------------------------------------ |
| API        | oRPC + OpenAPI                       |
| DB         | Drizzle ORM + Postgres               |
| Cache/DB   | Valkey (Redis-compatible)            |
| Auth       | Better Auth (Redis session store)    |
| Validation | Zod (`@ziron/validators`)            |
| Jobs       | Inngest                              |
| Rate limit | rate-limiter-flexible                |
| Logging    | Pino or Winston                      |

---

## oRPC Patterns

### Contracts and Routers

The router type is the **API contract** — clients infer types from `RouterClient<typeof router>`. Use `os` from `@orpc/server`. Procedures accept `.input()` Zod schemas from `@ziron/validators`. Domain routers are merged into a root router.

```typescript
import { os } from '@orpc/server'
import { createCardSchema } from '@ziron/validators'

export const createCard = os
  .input(createCardSchema)
  .handler(async ({ input, context }) => {
    return db.insert(cards).values({ ...input, organizationId: context.org.id }).returning()
  })

export const cardsRouter = {
  create: createCard,
  // list, get, update, delete...
}
```

### OpenAPI Support

Use `.route()`, `.output()`, and `OpenAPIHandler` when you need REST-style paths and OpenAPI spec generation.

```typescript
import { OpenAPIHandler } from '@orpc/openapi/node'
import { OpenAPIGenerator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'

const listCards = os
  .route({ method: 'GET', path: '/cards' })
  .input(z.object({ limit: z.number().optional(), cursor: z.string().optional() }))
  .output(z.array(cardSchema))
  .handler(async ({ input }) => { /* ... */ })

const handler = new OpenAPIHandler(router, { plugins: [new CORSPlugin()] })

// Generate OpenAPI spec
const generator = new OpenAPIGenerator({ schemaConverters: [new ZodToJsonSchemaConverter()] })
const spec = await generator.generate(router, { info: { title: 'ZironTap API', version: '1.0.0' } })
```

### Context (Initial + Execution)

- **Initial context:** Passed when invoking the handler (e.g. headers, env).
- **Execution context:** Injected by middleware (auth, org, db).

```typescript
const base = os.$context<{ headers: Headers }>()

const baseWithAuth = base.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers })
  if (!session?.user) throw new ORPCError('UNAUTHORIZED')
  return next({ context: { user: session.user } })
})
```

### Middleware Stack

Compose base, auth, db, rate-limit, and error middleware. Use `.$context` for dependent context and `next({ context })` to merge.

```typescript
import { os, ORPCError } from '@orpc/server'

const authMiddleware = os
  .$context<{ headers: Headers }>()
  .middleware(async ({ context, next }) => {
    const session = await auth.api.getSession({ headers: context.headers })
    if (!session?.user) throw new ORPCError('UNAUTHORIZED')
    return next({ context: { user: session.user } })
  })

const orgMiddleware = os
  .$context<{ user: User }>()
  .middleware(async ({ context, next }, orgSlug: string) => {
    const org = await getOrgForUser(context.user.id, orgSlug)
    if (!org) throw new ORPCError('NOT_FOUND')
    return next({ context: { org } })
  })
```

### Type-Safe Errors

Define errors on the base procedure so clients infer structure. Never put sensitive data in `ORPCError.data`.

```typescript
import { os } from '@orpc/server'
import * as z from 'zod'

const base = os.errors({
  UNAUTHORIZED: { message: 'Sign in to continue.' },
  FORBIDDEN: { message: "You don't have permission." },
  NOT_FOUND: { message: "This doesn't exist or was deleted." },
  BAD_REQUEST: { message: 'Something went wrong. Please try again.' },
  CONFLICT: { message: 'This name or link is already in use.' },
  TOO_MANY_REQUESTS: { message: 'Too many requests. Wait and try again.', data: z.object({ retryAfter: z.number() }) },
  UNPROCESSABLE_CONTENT: { message: 'Please check your input and try again.' },
})

const procedure = base.handler(async ({ input, errors }) => {
  if (!found) throw errors.NOT_FOUND()
  // or: throw new ORPCError('NOT_FOUND')
})
```

### Event Iterator (SSE)

Use `eventIterator` and `withEventMeta` for live notifications. Combine with `MemoryPublisher` or Redis pub/sub for multi-instance.

```typescript
import { eventIterator, withEventMeta } from '@orpc/server'

const eventSchema = z.object({ type: z.string(), payload: z.record(z.unknown()) })

const notifications = os
  .output(eventIterator(eventSchema))
  .handler(async function* ({ input, signal, lastEventId }) {
    const iterator = publisher.subscribe(`org:${input.orgId}:notifications`, { signal })
    for await (const payload of iterator) {
      yield withEventMeta(payload, { id: crypto.randomUUID(), retry: 10_000 })
    }
  })
```

### RPCHandler Interceptors

Use `onError`, `onStart`, `onSuccess`, `onFinish` for global logging/monitoring.

```typescript
import { onError } from '@orpc/server'

const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      logger.error({ err: error, path: error.path })
    }),
  ],
})
```

---

## Drizzle + Postgres

Use Drizzle for all DB access. See `@ziron/db` and `.cursor/skills/drizzle-orm-patterns/SKILL.md` for details.

### Query Optimization

```typescript
// ✅ Select only needed columns
const rows = await db.select({ id, name, slug }).from(cards).where(eq(cards.organizationId, orgId)).limit(20)

// ❌ Avoid select('*')
const rows = await db.select().from(cards)  // fetches everything
```

### N+1 Prevention

```typescript
// ✅ Batch fetch with Map
const cards = await db.select().from(cards).where(eq(cards.organizationId, orgId))
const creatorIds = [...new Set(cards.map((c) => c.createdBy).filter(Boolean))]
const creators = await db.select().from(users).where(inArray(users.id, creatorIds))
const creatorMap = new Map(creators.map((u) => [u.id, u]))
const cardsWithCreators = cards.map((c) => ({ ...c, creator: creatorMap.get(c.createdBy) }))
```

### Transactions

```typescript
await db.transaction(async (tx) => {
  const [card] = await tx.insert(cards).values(data).returning()
  await tx.insert(shortLinks).values({ cardId: card.id, shortCode: code })
})
```

---

## Valkey (Redis) Patterns

Valkey is Redis-compatible. Use for: sessions (Better Auth), caching, rate-limiting storage.

### Session Store (Better Auth)

Better Auth uses Redis for session persistence. Configure in `packages/auth`:

```typescript
// Better Auth config uses Redis adapter for session store
import { redisAdapter } from 'better-auth/adapters/redis'
// or custom adapter wiring REDIS_URL
```

### Cache-Aside with Valkey

```typescript
const cacheKey = `org:${orgId}`
const cached = await redis.get(cacheKey)
if (cached) return JSON.parse(cached)

const org = await db.query.organizations.findFirst({ where: eq(organizations.id, orgId) })
if (org) await redis.setex(cacheKey, 300, JSON.stringify(org))  // 5min TTL
return org
```

### Invalidation

Invalidate on update/delete: `redis.del(`org:${orgId}`)`.

---

## Better Auth

- Use Better Auth for users, orgs, sessions. Session store: Redis/Valkey.
- Auth context in oRPC: `auth.api.getSession({ headers })`.
- RBAC: `organization_members.role` (super_admin | admin | member).

---

## Error Handling (Zod + oRPC)

- **Input validation:** `.input(schema)` — Zod validates; failures surface as `UNPROCESSABLE_CONTENT` or similar.
- **Procedure errors:** Use `os.errors()` and `throw errors.CODE()` or `throw new ORPCError('CODE')`.
- **Handler-level:** `onError` interceptor for logging/Sentry.

---

## Rate Limiting (rate-limiter-flexible)

Use `@ziron/rate-limit` with rate-limiter-flexible + Valkey. Apply as oRPC middleware or interceptor.

```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis'

const limiter = new RateLimiterRedis({ storeClient: new Redis(process.env.REDIS_URL!), points: 100, duration: 60 })

const rateLimitMiddleware = os.middleware(async ({ context, next }) => {
  const key = context.user?.id ?? context.headers?.['x-forwarded-for'] ?? 'ip:unknown'
  try {
    await limiter.consume(key)
  } catch {
    throw errors.TOO_MANY_REQUESTS({ data: { retryAfter: 60 } })
  }
  return next()
})
```

---

## Background Jobs (Inngest)

Use `@ziron/jobs` with Inngest adapter. Trigger from oRPC procedures or webhooks.

```typescript
import { Inngest } from 'inngest'

const inngest = new Inngest({ id: 'zirontap' })

inngest.createFunction(
  { id: 'send-invite-email', retries: 2 },
  { event: 'org/invite.created' },
  async ({ event }) => {
    await sendInviteEmail(event.data.email, event.data.orgSlug)
  }
)

// From oRPC procedure:
await inngest.send({ name: 'org/invite.created', data: { email, orgSlug } })
```

Mount handler at `apps/portal/src/app/api/inngest/route.ts`.

---

## Logging (Pino or Winston)

Structured logging with requestId, userId, orgId. Avoid PII at info level.

```typescript
import pino from 'pino'

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' })

logger.info({ requestId, userId, path: '/cards.create' }, 'Card created')
logger.error({ err, requestId, userId }, 'Procedure failed')
```

Use in `onError` interceptor and error middleware to log with context.

---

## Checklist

- [ ] oRPC procedures use Zod from `@ziron/validators`
- [ ] Middleware stack: base → auth → org → rate-limit → errors
- [ ] Type-safe errors via `os.errors()`; no sensitive data in `ORPCError.data`
- [ ] Drizzle for all DB; Valkey for sessions, cache, rate-limit
- [ ] Inngest for background jobs; fire from procedures when appropriate
- [ ] Structured logging (Pino/Winston) with context
- [ ] OpenAPI when REST-style paths or spec generation is needed
