import { ResetPasswordView } from "@/features/auth/views/reset-password-view";

type ResetPasswordPageProps = {
	searchParams: Promise<{
		token?: string | string[];
		error?: string | string[];
	}>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
	const params = await searchParams;
	const tokenParam = params.token;
	const token = typeof tokenParam === "string" ? tokenParam : null;
	const errorParam = params.error;
	const error = typeof errorParam === "string" ? errorParam : null;

	return <ResetPasswordView error={error} token={token} />;
}
