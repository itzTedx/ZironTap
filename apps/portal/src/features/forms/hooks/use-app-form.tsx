import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { InputField } from "../components/input-field";
import { SubmitButton } from "../components/submit-button";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		InputField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
