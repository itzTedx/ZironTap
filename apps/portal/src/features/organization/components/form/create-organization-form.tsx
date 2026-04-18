import { useEffect, useRef, useTransition } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUploadFile } from "@better-upload/client";
import { useForm } from "@tanstack/react-form";

import { Badge } from "@ziron/ui/components/badge";
import { DialogPanel } from "@ziron/ui/components/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@ziron/ui/components/field";
import { Fieldset } from "@ziron/ui/components/fieldset";
import { Input } from "@ziron/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@ziron/ui/components/input-group";
import { toastManager } from "@ziron/ui/components/toast";
import { slugify } from "@ziron/ui/lib/slugify";

import { type CreateOrganizationType, createOrganizationSchema } from "@ziron/validators";

import { UploadButton } from "@/components/primitives/upload/upload-button";

import { authClient, useSession } from "@/lib/auth/client";
import { UPLOAD_ROUTES } from "@/lib/constants/upload";

/** Ignores placeholder entries TanStack Form can add to `meta.errors` after blur when no real validator ran. */
function hasDisplayableFieldErrors(errors: Array<{ message?: string } | undefined> | undefined): boolean {
	return errors?.some((e) => typeof e?.message === "string" && e.message.length > 0) ?? false;
}

function organizationFormHasEditableValues(values: CreateOrganizationType): boolean {
	if (values.name.trim() !== "") {
		return true;
	}
	if ((values.website ?? "").trim() !== "") {
		return true;
	}
	if ((values.phone ?? "").trim() !== "") {
		return true;
	}
	if ((values.email ?? "").trim() !== "") {
		return true;
	}
	if ((values.address ?? "").trim() !== "") {
		return true;
	}
	return false;
}

function ReportOrganizationFormHasValues({
	hasValues,
	onHasValuesChange,
}: {
	hasValues: boolean;
	onHasValuesChange?: (has: boolean) => void;
}) {
	const onHasValuesChangeRef = useRef(onHasValuesChange);
	onHasValuesChangeRef.current = onHasValuesChange;

	useEffect(() => {
		onHasValuesChangeRef.current?.(hasValues);
	}, [hasValues]);

	return null;
}

export const CreateOrganizationForm = ({
	children,
	onSubmit,
	onHasValuesChange,
}: {
	children: React.ReactNode;
	onSubmit: () => void;
	onHasValuesChange?: (has: boolean) => void;
}) => {
	const { data: session } = useSession();
	const [, startTransition] = useTransition();
	const router = useRouter();
	const defaultValues: CreateOrganizationType = {
		name: "",
		slug: "",
		logo: "",
		website: undefined,
		phone: undefined,
		email: undefined,
		address: "",
	};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: createOrganizationSchema,
		},

		onSubmit: async ({ value }) => {
			startTransition(async () => {
				await authClient.organization.create({
					name: value.name, // required
					slug: slugify(value.name), // required
					logo: value.logo,
					userId: session?.user?.id,
					keepCurrentActiveOrganization: false,

					fetchOptions: {
						onSuccess: () => {
							onSubmit();
							toastManager.add({
								title: "Organization created successfully.",
								description: "You can now start using ZironTap.",
								type: "success",

								timeout: 3000,
							});
							router.push("/");
						},
					},
				});
			});
		},
	});

	const { control } = useUploadFile({
		route: UPLOAD_ROUTES.logo,
		onUploadComplete: ({ metadata }) => {
			console.log("onUploadComplete", metadata);
			form.setFieldValue("logo", metadata.url as string);
		},
	});

	return (
		<form
			className="contents"
			data-slot="form"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Subscribe
				children={(state) => (
					<ReportOrganizationFormHasValues
						hasValues={organizationFormHasEditableValues(state.values)}
						onHasValuesChange={onHasValuesChange}
					/>
				)}
				selector={(state) => state}
			/>
			<DialogPanel>
				<FieldGroup className="pt-4">
					<form.Subscribe
						children={(logo) => (
							<form.Field
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Logo</FieldLabel>
											<div className="flex items-center gap-4">
												<div className="relative size-24 rounded-md bg-muted">
													{logo ? (
														<Image
															alt="Organization Logo"
															className="object-contain"
															fill
															src={logo}
														/>
													) : null}
												</div>

												<div className="space-y-1">
													<UploadButton control={control} />
													<FieldDescription>
														Recommended size: 1:1, up to 2mb
													</FieldDescription>
												</div>
											</div>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
								name="logo"
							/>
						)}
						selector={(state) => state.values.logo}
					/>

					<form.Field
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && hasDisplayableFieldErrors(field.state.meta.errors);
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Name</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										autoComplete="off"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Enter a name of the organization"
										value={field.state.value}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
						name="name"
					/>
					<form.Field
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && hasDisplayableFieldErrors(field.state.meta.errors);
							return (
								<Field data-invalid={isInvalid}>
									<div className="flex items-center justify-between gap-2">
										<FieldLabel htmlFor={field.name}>Website</FieldLabel>
										<Badge variant="info">Optional</Badge>
									</div>
									<Input
										aria-invalid={isInvalid}
										autoComplete="off"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="www.company.com"
										value={field.state.value}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
						name="website"
					/>
					<Fieldset className="flex w-full flex-col md:flex-row">
						<form.Field
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && hasDisplayableFieldErrors(field.state.meta.errors);
								return (
									<Field data-invalid={isInvalid}>
										<div className="flex items-center justify-between gap-2">
											<FieldLabel htmlFor={field.name}>Phone</FieldLabel>
											<Badge variant="info">Optional</Badge>
										</div>
										<Input
											aria-invalid={isInvalid}
											autoComplete="off"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="+971 54 698 7654"
											value={field.state.value}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
							name="phone"
						/>
						<form.Field
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && hasDisplayableFieldErrors(field.state.meta.errors);
								return (
									<Field data-invalid={isInvalid}>
										<div className="flex items-center justify-between gap-2">
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Badge variant="info">Optional</Badge>
										</div>
										<Input
											aria-invalid={isInvalid}
											autoComplete="off"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="example@company.com"
											value={field.state.value}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
							name="email"
						/>
					</Fieldset>

					<form.Field
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<div className="flex items-center justify-between gap-2">
										<FieldLabel htmlFor={field.name}>Address</FieldLabel>
										<Badge variant="info">Optional</Badge>
									</div>
									<InputGroup>
										<InputGroupTextarea
											aria-invalid={isInvalid}
											className="min-h-24 resize-none"
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Enter the address of the organization"
											rows={4}
											value={field.state.value}
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.state.value?.length ?? 0}/256 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>

									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
						name="address"
					/>
				</FieldGroup>
			</DialogPanel>
			{children}
		</form>
	);
};
