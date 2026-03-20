import nodemailer from "nodemailer";

import { env } from "@ziron/env/server";

// Create reusable transporter object using SMTP transport
// For development, you can use services like Mailtrap, Ethereal, or a local SMTP server
// For production, configure with your SMTP provider (Gmail, SendGrid, AWS SES, etc.)
const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST || "smtp.ethereal.email",
	port: Number(env.SMTP_PORT) || 587,
	secure: env.SMTP_SECURE, // true for 465, false for other ports
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
});

export interface SendEmailOptions {
	attachments?: Array<{
		filename: string;
		content?: string | Buffer;
		path?: string;
		contentType?: string;
	}>;
	from?: string;
	html?: string;
	replyTo?: string;
	subject: string;
	text?: string;
	to: string | string[];
}

/**
 * Send an email using Nodemailer
 * @see https://nodemailer.com/
 */
export async function sendEmail(options: SendEmailOptions) {
	const { to, subject, html, text, from, replyTo, attachments } = options;

	const fromAddress = from || env.SMTP_FROM_EMAIL || "noreply@example.com";

	try {
		const info = await transporter.sendMail({
			from: fromAddress,
			to: Array.isArray(to) ? to.join(", ") : to,
			subject,
			html,
			text,
			replyTo,
			attachments,
		});

		console.log("Email sent:", info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Email sending error:", error);
		throw error;
	}
}

/**
 * Verify SMTP connection configuration
 * Call this on startup to ensure email sending will work
 */
export async function verifyEmailConnection(): Promise<boolean> {
	try {
		await transporter.verify();
		console.log("SMTP connection verified successfully");
		return true;
	} catch (error) {
		console.error("SMTP connection verification failed:", error);
		return false;
	}
}

/**
 * Get the nodemailer transporter instance for advanced usage
 */
export function getTransporter() {
	return transporter;
}

export { transporter };
