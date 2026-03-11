import { AuthCard } from "../components/auth-card";
import { RegisterForm } from "../components/forms/register-form";

export const RegisterView = () => {
	return (
		<AuthCard description="Welcome! Please fill in the details to get started." title="Create your account">
			<RegisterForm />
		</AuthCard>
	);
};
