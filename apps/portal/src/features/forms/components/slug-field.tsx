import { type ComponentProps, startTransition, useActionState, useEffect, useState } from "react";

import { CheckCircleIcon, CheckIcon, SpinnerIcon } from "@phosphor-icons/react/dist/ssr";
import { useStore } from "@tanstack/react-form-nextjs";
import { EditIcon } from "lucide-react";

import { Button } from "@ziron/ui/components/button";
import {
	Card,
	CardAction,
	CardFrame,
	CardFrameFooter,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@ziron/ui/components/card";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@ziron/ui/components/input-group";

import { authClient } from "@/lib/auth/client";
import { SHORT_DOMAIN } from "@/utils/constants";

import { useFieldContext } from "../hooks/form-contexts";

interface SlugFieldProps extends ComponentProps<typeof Input> {
	label: string;
	className?: string;
}

export function SlugField({ label, placeholder, className, required, ...rest }: SlugFieldProps) {
	const field = useFieldContext<string>();
	const [debouncedValue, setDebouncedValue] = useState(field.state.value);
	const [isEditMode, setIsEditMode] = useState(false);

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const [data, checkSlugAction, isPending] = useActionState(async (_: { status: boolean } | null, slug: string) => {
		if (!slug) return null;
		try {
			const { data, error } = await authClient.organization.checkSlug({ slug });
			if (error) return { status: false };
			return data;
		} catch {
			return { status: false };
		}
	}, null);

	const isAvailable = data === null ? null : data.status === true;

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(field.state.value);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [field.state.value]);

	useEffect(() => {
		startTransition(() => {
			checkSlugAction(debouncedValue);
		});
	}, [debouncedValue, checkSlugAction]);

	const handleEditButton = () => {
		setIsEditMode(!isEditMode);
	};

	return (
		<CardFrame className="h-fit w-full max-w-xs">
			<Card className="gap-0">
				<CardHeader className="items-center gap-0 p-2 px-3 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-2">
					<CardTitle className="text-sm">
						Link {required && <span className="font-medium text-brand-accent-foreground">*</span>}
					</CardTitle>
					<CardAction>
						<Button onClick={handleEditButton} size="xs" type="button" variant="outline">
							{isEditMode ? (
								<>
									<CheckIcon className="me-1 size-3 text-muted-foreground" />
									Save
								</>
							) : (
								<>
									<EditIcon className="size-3 text-muted-foreground" />
									Edit
								</>
							)}
						</Button>
					</CardAction>
				</CardHeader>
				<CardPanel className="px-3 pb-3">
					<Field data-invalid={isInvalid || isAvailable === false}>
						<FieldLabel className="sr-only" htmlFor={field.name}>
							Link
						</FieldLabel>
						<InputGroup aria-invalid={isInvalid || isAvailable === false}>
							<InputGroupInput
								{...rest}
								aria-label="Set your URL"
								className="*:[input]:ps-0.5!"
								disabled={!isEditMode}
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={placeholder}
								readOnly={!isEditMode}
								value={field.state.value}
							/>
							<InputGroupAddon>
								<InputGroupText>{SHORT_DOMAIN}/</InputGroupText>
							</InputGroupAddon>
							{isAvailable && (
								<InputGroupAddon align="inline-end">
									<InputGroupText>
										<CheckCircleIcon className="text-success" weight="bold" />
									</InputGroupText>
								</InputGroupAddon>
							)}
						</InputGroup>
					</Field>
				</CardPanel>
			</Card>
			{(isInvalid || isPending || isAvailable === false) && (
				<CardFrameFooter className="px-3 py-2">
					{isInvalid && <FieldError errors={errors} />}
					{isAvailable === false && !isInvalid && (
						<p className="text-destructive text-xs">This link is already taken.</p>
					)}
					{isPending && (
						<div className="flex w-full justify-between gap-1 text-foreground/80 text-xs">
							<p>Checking availability...</p>
							<SpinnerIcon className="size-4 shrink-0 animate-spin" weight="bold" />
						</div>
					)}
					{/* {isAvailable === true && !isPending && !isInvalid && (
                        <p className="text-success text-xs">This link is available!</p>
                    )} */}
				</CardFrameFooter>
			)}
		</CardFrame>
	);
}
