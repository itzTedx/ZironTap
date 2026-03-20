import { ResetPasswordView } from "@/features/auth/views/reset-password-view";

type ResetPasswordPageProps = {
	searchParams: Promise<{
		token?: string;
		error?: string;
	}>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
	const params = await searchParams;
	const token = params.token ?? null;
	const error = params.error ?? null;

	return <ResetPasswordView error={error} token={token} />;
}
