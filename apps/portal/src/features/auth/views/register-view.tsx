import Link from "next/link";

import { AuthCard } from "../components/auth-card";
import { RegisterForm } from "../components/forms/register-form";

export const RegisterView = () => {
	return (
		<AuthCard
			description="Welcome! Please fill in the details to get started."
			footer={
				<Link className="group" href="/login">
					Already have an account?{" "}
					<span className="underline underline-offset-2 group-hover:no-underline">Sign in</span>
				</Link>
			}
			title="Create your account"
		>
			<RegisterForm />
		</AuthCard>
	);
};
