import Link from "next/link";

import { AuthCard } from "../components/auth-card";
import { LoginForm } from "../components/forms/login-form";

export const LoginView = () => {
	return (
		<AuthCard
			description="Welcome back! Please sign in to continue"
			footer={
				<Link className="group" href="/register">
					Don’t have an account?{" "}
					<span className="underline underline-offset-2 group-hover:no-underline">Sign up</span>
				</Link>
			}
			title="Sign in to Zirontap"
		>
			<LoginForm />
		</AuthCard>
	);
};
