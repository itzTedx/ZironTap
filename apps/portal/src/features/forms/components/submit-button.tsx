import { Button } from "@ziron/ui/components/button";

import { useFormContext } from "../hooks/use-app-form";

export function SubmitButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button disabled={isSubmitting} type="submit">
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
