import { ChartPieSliceIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@ziron/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@ziron/ui/components/empty";
import { TabsPanel } from "@ziron/ui/components/tabs";

import { withForm } from "@/features/forms/hooks/use-app-form";
import { cardFormOpts } from "@/features/forms/options/cards-form-opts";

export const SeoTab = withForm({
	...cardFormOpts,
	props: {
		value: "seo",
	},
	render: ({ form, value }) => {
		return (
			<TabsPanel className="space-y-3" value={value}>
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<ChartPieSliceIcon weight="fill" />
						</EmptyMedia>
						<EmptyTitle>You don't have any data to track... yet</EmptyTitle>
						<EmptyDescription>
							Publish your page to start tracking how your audience is engaging
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button>Publish Page</Button>
					</EmptyContent>
				</Empty>
			</TabsPanel>
		);
	},
});
