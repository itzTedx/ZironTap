import { Geist, Geist_Mono } from "next/font/google";

import "@ziron/ui/globals.css";

import { cn } from "@ziron/ui/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn("antialiased", fontMono.variable, "font-sans", fontSans.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
