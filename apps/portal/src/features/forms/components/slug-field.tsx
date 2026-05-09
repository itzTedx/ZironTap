import { type ComponentProps, useState } from "react";

import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
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

import { SHORT_DOMAIN } from "@/utils/constants";

import { useFieldContext } from "../hooks/form-contexts";

interface SlugFieldProps extends ComponentProps<typeof Input> {
	label: string;
	className?: string;
}

export function SlugField({ label, placeholder, className, required, ...rest }: SlugFieldProps) {
	const field = useFieldContext<string>();
	const [isEditMode, setIsEditMode] = useState(false);

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

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
					<Field data-invalid={isInvalid}>
						<FieldLabel className="sr-only" htmlFor={field.name}>
							Link
						</FieldLabel>
						<InputGroup aria-invalid={isInvalid}>
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
						</InputGroup>
					</Field>
				</CardPanel>
			</Card>
			{isInvalid && (
				<CardFrameFooter className="px-3 py-2">{isInvalid && <FieldError errors={errors} />}</CardFrameFooter>
			)}
		</CardFrame>
	);
}
