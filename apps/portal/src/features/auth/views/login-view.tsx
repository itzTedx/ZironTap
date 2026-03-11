import { AuthCard } from "../components/auth-card";
import { LoginForm } from "../components/forms/login-form";

export const LoginView = () => {
	return (
		<AuthCard description="Welcome back! Please sign in to continue" title="Sign in to Zirontap">
			<LoginForm />
		</AuthCard>
	);
};
