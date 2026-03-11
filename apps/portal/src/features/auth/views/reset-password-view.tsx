import Link from "next/link";

import { AuthCard } from "../components/auth-card";
import { ResetPasswordForm } from "../components/forms/reset-password-form";

type ResetPasswordViewProps = {
	token: string | null;
	error: string | null;
};

export const ResetPasswordView = ({ token, error }: ResetPasswordViewProps) => {
	const hasValidToken = Boolean(token) && !error;

	const description = hasValidToken
		? "Enter your new password."
		: "Your reset link is invalid or has expired. Request a new link to reset your password.";

	return (
		<AuthCard
			description={description}
			footer={
				hasValidToken ? (
					<Link className="group" href="/login">
						Already have an account?{" "}
						<span className="underline underline-offset-2 group-hover:no-underline">Sign in</span>
					</Link>
				) : (
					<Link className="group" href="/forgot-password">
						Need a new link?{" "}
						<span className="underline underline-offset-2 group-hover:no-underline">
							Request password reset
						</span>
					</Link>
				)
			}
			title="Reset your password"
		>
			{hasValidToken ? <ResetPasswordForm token={token} /> : null}
		</AuthCard>
	);
};
