import type { SVGProps } from "react";

import { cn } from "@ziron/ui/lib/utils";
export interface DeviceProps extends SVGProps<SVGSVGElement> {
	children: React.ReactNode;
}

export const IphonePreview = ({ children, ...props }: DeviceProps) => {
	return (
		<svg fill="none" height={400} viewBox="0 0 200 400" width={200} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M194.85,127.85c0-.25-.2-.45-.44-.45-.11.04-.37.03-.68,0V36.12c0-17.91-14.29-32.42-31.91-32.42H38.17C20.55,3.7,6.26,18.21,6.26,36.12v49.16c-.3.02-.55.03-.65-.02-.24,0-.44.2-.44.45,0,0,0,17.36,0,17.36-.03.41.5.49,1.09.48v13.68c-.6,0-1.13.08-1.09.49,0,0,0,28.64,0,28.64-.03.42.5.49,1.09.48v7.98c-.6,0-1.13.08-1.09.49,0,0,0,28.64,0,28.64-.03.42.5.49,1.09.48v179.5c0,17.91,14.29,32.42,31.91,32.42h123.65c17.62,0,31.91-14.52,31.91-32.42v-189.55c.31-.02.57-.03.68.04,1.25.1.03-46.11.44-46.55ZM187.32,363.23c0,13.61-13.25,26.65-26.64,26.65H39.32c-13.39,0-26.62-13.04-26.62-26.65V36.8c0-13.61,13.22-26.69,26.62-26.69h121.36c13.39,0,26.64,13.08,26.64,26.69v326.43Z"
				fill="#303333"
			/>
			{children && (
				<foreignObject height="379.78" rx="26.97" ry="26.97" width="174.62" x="12.7" y="10.11">
					{children}
				</foreignObject>
			)}
			<path
				d="M161.38,5.89H38.78c-16.54,0-29.95,13.5-29.95,30.15v327.79c0,16.65,13.41,30.15,29.95,30.15h122.6c16.54,0,29.95-13.5,29.95-30.15V36.05c0-16.65-13.41-30.15-29.95-30.15ZM187.32,363.65c0,13.69-12.28,26.24-25.87,26.24H38.7c-13.6,0-26-12.55-26-26.24V36.24c0-13.69,11.42-26.13,25.02-26.13h122.75c13.6,0,26.85,12.44,26.85,26.13v327.4Z"
				fill="#000000"
			/>
			<rect fill="currentColor" height="379.78" rx="26.97" ry="26.97" width="174.62" x="12.7" y="10.11" />

			<path
				d="M119.61,32.33h-38.93c-10.48-.18-10.5-15.78,0-15.96,0,0,38.93,0,38.93,0,4.41,0,7.98,3.57,7.98,7.98,0,4.41-3.57,7.98-7.98,7.98Z"
				fill="#000000"
			/>
			<path d="M118.78,27.68c-4.32.06-4.32-6.73,0-6.66,4.32-.06,4.32,6.73,0,6.66Z" fill="#080d4c" />
			<defs>
				<clipPath id="roundedCornersiPhone">
					<rect fill="#ffffff" height="379.78" rx="26.97" ry="26.97" width="174.62" x="12.7" y="10.11" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default function PhoneMockup({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				"relative mx-auto h-full w-[240px] rounded-[2.5rem] border-10 border-zinc-900 bg-zinc-900 shadow-xl",
				className
			)}
		>
			<div className="absolute top-1.5 left-1/2 z-40 flex h-6 w-[80px] -translate-x-1/2 items-center justify-end rounded-full bg-zinc-900/70 px-2 backdrop-blur-md">
				<div className="size-3 rounded-full border-2 border-zinc-600 bg-zinc-900" />
			</div>
			<div className="absolute -inset-s-[13px] top-[124px] z-40 h-[46px] w-[3px] rounded-s-lg bg-zinc-900" />
			<div className="absolute -inset-s-[13px] top-[178px] z-40 h-[46px] w-[3px] rounded-s-lg bg-zinc-900" />
			<div className="absolute -inset-e-[13px] top-[142px] z-40 h-[64px] w-[3px] rounded-e-lg bg-zinc-900" />
			<div className="@container aspect-9/18 w-[222px] overflow-hidden rounded-4xl bg-background">{children}</div>
		</div>
	);
}
