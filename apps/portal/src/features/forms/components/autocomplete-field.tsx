import type { ComponentProps } from "react";

import { useStore } from "@tanstack/react-form-nextjs";

import {
	Autocomplete,
	AutocompleteEmpty,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
	AutocompletePopup,
} from "@ziron/ui/components/autocomplete";
import { Field, FieldError, FieldLabel } from "@ziron/ui/components/field";

import { useFieldContext } from "../hooks/form-contexts";

interface AutocompleteFieldProps extends ComponentProps<typeof AutocompleteInput> {
	label: string;
	className?: string;
}

export function AutocompleteField({ label, placeholder, className, required, ...rest }: AutocompleteFieldProps) {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field className={className} data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>
				{label}
				{required && <span className="font-medium text-brand-accent-foreground">*</span>}
			</FieldLabel>
			<Autocomplete
				items={JOB_TITLES}
				onValueChange={(value) => field.handleChange(value)}
				value={field.state.value}
			>
				<AutocompleteInput
					{...rest}
					aria-invalid={isInvalid}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
					placeholder={placeholder}
				/>
				<AutocompletePopup>
					<AutocompleteEmpty>No items found.</AutocompleteEmpty>
					<AutocompleteList>
						{(item) => (
							<AutocompleteItem key={item.value} value={item}>
								{item.label}
							</AutocompleteItem>
						)}
					</AutocompleteList>
				</AutocompletePopup>
			</Autocomplete>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}

const JOB_TITLES = [
	{ label: "Software Engineer", value: "software-engineer" },
	{ label: "Frontend Developer", value: "frontend-developer" },
	{ label: "Backend Developer", value: "backend-developer" },
	{ label: "Full Stack Developer", value: "full-stack-developer" },
	{ label: "Web Developer", value: "web-developer" },
	{ label: "Mobile App Developer", value: "mobile-app-developer" },
	{ label: "DevOps Engineer", value: "devops-engineer" },
	{ label: "Cloud Engineer", value: "cloud-engineer" },
	{ label: "Data Engineer", value: "data-engineer" },
	{ label: "Machine Learning Engineer", value: "machine-learning-engineer" },
	{ label: "AI Engineer", value: "ai-engineer" },
	{ label: "Cybersecurity Analyst", value: "cybersecurity-analyst" },
	{ label: "QA Engineer", value: "qa-engineer" },
	{ label: "System Administrator", value: "system-administrator" },

	{ label: "UI Designer", value: "ui-designer" },
	{ label: "UX Designer", value: "ux-designer" },
	{ label: "UI/UX Designer", value: "ui-ux-designer" },
	{ label: "Product Designer", value: "product-designer" },
	{ label: "Graphic Designer", value: "graphic-designer" },
	{ label: "Motion Designer", value: "motion-designer" },
	{ label: "3D Artist", value: "3d-artist" },
	{ label: "Animator", value: "animator" },
	{ label: "Creative Director", value: "creative-director" },

	{ label: "Product Manager", value: "product-manager" },
	{ label: "Project Manager", value: "project-manager" },
	{ label: "Business Analyst", value: "business-analyst" },
	{ label: "Operations Manager", value: "operations-manager" },
	{ label: "Marketing Manager", value: "marketing-manager" },
	{ label: "Digital Marketing Specialist", value: "digital-marketing-specialist" },
	{ label: "SEO Specialist", value: "seo-specialist" },
	{ label: "Content Strategist", value: "content-strategist" },
	{ label: "Social Media Manager", value: "social-media-manager" },

	{ label: "Sales Executive", value: "sales-executive" },
	{ label: "Account Manager", value: "account-manager" },
	{ label: "Business Development Manager", value: "business-development-manager" },
	{ label: "Customer Support Specialist", value: "customer-support-specialist" },
	{ label: "Customer Success Manager", value: "customer-success-manager" },

	{ label: "Accountant", value: "accountant" },
	{ label: "Financial Analyst", value: "financial-analyst" },
	{ label: "HR Manager", value: "hr-manager" },
	{ label: "HR Executive", value: "hr-executive" },
	{ label: "Office Administrator", value: "office-administrator" },
	{ label: "Administrative Assistant", value: "administrative-assistant" },

	{ label: "Civil Engineer", value: "civil-engineer" },
	{ label: "Mechanical Engineer", value: "mechanical-engineer" },
	{ label: "Electrical Engineer", value: "electrical-engineer" },
	{ label: "Architect", value: "architect" },
	{ label: "Technician", value: "technician" },
	{ label: "Consultant", value: "consultant" },
	{ label: "Teacher", value: "teacher" },
];
