import { createFormHook, createFormHookContexts } from "@tanstack/react-form-nextjs";

import { AutocompleteField } from "../components/autocomplete-field";
import { CoverUploadField } from "../components/cover-upload-field";
import { InputField } from "../components/input-field";
import { ProfileUploadField } from "../components/profile-upload-field";
import { SlugField } from "../components/slug-field";
import { SubmitButton } from "../components/submit-button";
import { TextField } from "../components/textarea-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		InputField,
		TextField,
		CoverUploadField,
		ProfileUploadField,
		AutocompleteField,
		SlugField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
