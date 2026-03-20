import Link from "next/link";

import { Alert } from "@ziron/ui/components/alert";

import { AuthCard } from "../components/auth-card";
import { LoginForm } from "../components/forms/login-form";

type LoginViewProps = {
	showResetSuccess?: boolean;
};

export const LoginView = ({ showResetSuccess }: LoginViewProps) => {
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
			{showResetSuccess ? (
				<Alert className="mb-6">
					<div className="absolute top-1/2 left-1 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand-500" />{" "}
					Password changed, please sign in
				</Alert>
			) : null}
			<LoginForm />
		</AuthCard>
	);
};
