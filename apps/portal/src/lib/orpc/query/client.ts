import {
	defaultShouldDehydrateQuery,
	QueryCache,
	QueryClient,
} from "@tanstack/react-query";

import { toastManager } from "@ziron/ui/components/toast";
import { serializer } from "./serializer";

export function createQueryClient() {
	return new QueryClient({
		queryCache: new QueryCache({
			onError: (error, query) => {
				const id = toastManager.add({
					title: "Error",
					description: `Error: ${error.message}`,

					actionProps: {
						children: "Retry",
						onClick: () => {
							toastManager.close(id);
							query.invalidate();
						},
					},

					type: "error",
				});
			},
		}),
		defaultOptions: {
			queries: {
				queryKeyHashFn(queryKey) {
					const [json, meta] = serializer.serialize(queryKey);
					return JSON.stringify({ json, meta });
				},
				staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
			},
			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
				serializeData(data) {
					const [json, meta] = serializer.serialize(data);
					return { json, meta };
				},
			},
			hydrate: {
				deserializeData(data) {
					return serializer.deserialize(data.json, data.meta);
				},
			},
		},
	});
}
