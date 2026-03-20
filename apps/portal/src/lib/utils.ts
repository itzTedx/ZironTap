import { env } from "@ziron/env/server";

export const generatePublicUrl = (objectKey: string) => {
	return `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_BUCKET_REGION}.amazonaws.com/${objectKey}`;
};
