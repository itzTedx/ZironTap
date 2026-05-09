"use client";

import { FloppyDiskBackIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr";

import {
	ActionBar,
	ActionBarGroup,
	ActionBarItem,
	ActionBarSelection,
	ActionBarSeparator,
} from "@ziron/ui/components/action-bar";

import { withForm } from "@/features/forms/hooks/use-app-form";
import { cardFormOpts } from "@/features/forms/options/cards-form-opts";

export const CardActionBar = withForm({
	...cardFormOpts,
	render: ({ form }) => {
		return (
			<form.Subscribe selector={(state) => state}>
				{({ canSubmit, isDirty, isSubmitting, isTouched }) => (
					<ActionBar
						onOpenChange={(open) => {
							if (!open) {
								form.reset();
							}
						}}
						open={isDirty || isTouched}
					>
						<ActionBarSelection>
							<InfoIcon className="text-muted-foreground" weight="fill" />
							Unsaved changes
						</ActionBarSelection>

						<ActionBarSeparator />
						<ActionBarGroup>
							<ActionBarItem
								disabled={isSubmitting || (!isDirty && !isTouched)}
								onSelect={() => form.reset()}
								variant="destructive-outline"
							>
								Discard
							</ActionBarItem>
							<ActionBarItem disabled={isSubmitting || !canSubmit} type="submit" variant="default">
								<FloppyDiskBackIcon weight="fill" />
								{isSubmitting ? "Creating..." : "Create"}
							</ActionBarItem>
						</ActionBarGroup>
					</ActionBar>
				)}
			</form.Subscribe>
		);
	},
});
