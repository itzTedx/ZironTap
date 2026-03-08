# ZironTap Roadmap

Future versions and ideas. Implementation plans (00–13) and [full-project.plan.md](full-project.plan.md) describe v1 in detail.

---

## v1 (current)

- **Product:** Digital business cards only.
- **Offline (portal):** Cards only — IDB + pending queue; server as source of truth; conflict resolution via `version` column (optimistic concurrency, 409 on mismatch). No version history table.
- **Client:** NFC card based; user taps card → opens URL (e.g. `/[slug]`). All management in portal; client is view-only, online.
- **Auth:** Better Auth with Redis/Valkey as session store (sufficient for session persistence and sync after reconnect).

---

## v2

- **Product:** Add short links, QR generator, review cards (additive; see full-project §1.5 / §4.1).
- **Offline (optional):** Extend sync scope to links, QR, reviews if needed; same version-based conflict pattern per entity.
- **Analytics:** Full contextual + global analytics for all resource types.

---

## v3

- **Full version history:** Version history table(s) with JSON snapshot (e.g. `card_versions`: `entityId`, `version`, `data` snapshot, `createdAt`, `userId`). Compare/restore UI; conflict UI can show “your version vs current” and “restore previous version”. Requires schema addition and API for list/restore.

---

## Future ideas

- **Client PWA / cache:** Optional cache for recently viewed public cards (e.g. Service Worker + Cache API) for offline viewing after first visit.
- **Read replicas:** Analytics/reporting queries to read replica (full-project §5.1).
- **Separate analytics DB:** At very high event volume, move `analytics_events` to TimescaleDB or ClickHouse (§5.1).
- **Feature flags:** Super-admin route or env for risky features (full-project §11.3).
