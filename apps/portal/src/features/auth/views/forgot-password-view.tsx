import Link from "next/link";

import { AuthCard } from "../components/auth-card";
import { ForgotPasswordForm } from "../components/forms/forgot-password-form";

export const ForgotPasswordView = () => {
	return (
		<AuthCard
			description="Enter your email to reset your password."
			footer={
				<Link className="group" href="/register">
					Don’t have an account?{" "}
					<span className="underline underline-offset-2 group-hover:no-underline">Sign up</span>
				</Link>
			}
			title="Forgot your password?"
		>
			<ForgotPasswordForm />
		</AuthCard>
	);
};
