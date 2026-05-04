import { createFormHook } from "@tanstack/react-form-nextjs";

import { AutocompleteField } from "../components/autocomplete-field";
import { CoverUploadField } from "../components/cover-upload-field";
import { InputField } from "../components/input-field";
import { ProfileUploadField } from "../components/profile-upload-field";
import { SelectField } from "../components/select-field";
import { SlugField } from "../components/slug-field";
import { SubmitButton } from "../components/submit-button";
import { TextField } from "../components/textarea-field";
import { fieldContext, formContext } from "./form-contexts";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldComponents: {
		InputField,
		TextField,
		SelectField,
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
