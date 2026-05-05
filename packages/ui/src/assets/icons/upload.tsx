"use client";
import { forwardRef, type HTMLAttributes, type MouseEvent, useCallback, useImperativeHandle, useRef } from "react";

import type { Variants } from "motion/react";
import { domMin, LazyMotion, m, useAnimation, useReducedMotion } from "motion/react";

import { cn } from "@ziron/ui/lib/utils";

export const IconUpload = (props: SVGProps) => {
	return (
		<svg {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z" />
		</svg>
	);
};

export interface CloudUploadIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CloudUploadIconProps
	extends Omit<
		HTMLAttributes<HTMLDivElement>,
		| "color"
		| "onDrag"
		| "onDragStart"
		| "onDragEnd"
		| "onAnimationStart"
		| "onAnimationEnd"
		| "onAnimationIteration"
	> {
	size?: number;
	duration?: number;
	isAnimated?: boolean;
	color?: string;
}

const CloudUploadIcon = forwardRef<CloudUploadIconHandle, CloudUploadIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 24, duration = 1, isAnimated = true, color, ...props }, ref) => {
		const controls = useAnimation();
		const reduced = useReducedMotion();
		const isControlled = useRef(false);

		useImperativeHandle(ref, () => {
			isControlled.current = true;
			return {
				startAnimation: () => (reduced ? controls.start("normal") : controls.start("animate")),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleEnter = useCallback(
			(e?: React.MouseEvent<HTMLDivElement>) => {
				if (!isAnimated || reduced) return;
				if (!isControlled.current) controls.start("animate");
				else onMouseEnter?.(e as MouseEvent<HTMLDivElement>);
			},
			[controls, reduced, isAnimated, onMouseEnter]
		);

		const handleLeave = useCallback(
			(e?: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlled.current) controls.start("normal");
				else onMouseLeave?.(e as MouseEvent<HTMLDivElement>);
			},
			[controls, onMouseLeave]
		);

		const cloudVariants: Variants = {
			normal: { strokeDashoffset: 0, opacity: 1 },
			animate: {
				strokeDashoffset: [100, 0],
				opacity: [0.4, 1],
				transition: {
					duration: 0.7 * duration,
					ease: "easeInOut" as const,
				},
			},
		};

		const shaftVariants: Variants = {
			normal: { strokeDashoffset: 0, opacity: 1 },
			animate: {
				strokeDashoffset: [30, 0],
				opacity: [0.5, 1],
				transition: {
					duration: 0.55 * duration,
					ease: "easeInOut" as const,
					delay: 0.05,
				},
			},
		};

		const headVariants: Variants = {
			normal: { y: 0, scale: 1, opacity: 1 },
			animate: {
				y: [2, -2, 0],
				scale: [1, 1.06, 1],
				opacity: [0.7, 1],
				transition: {
					duration: 0.6 * duration,
					ease: "easeInOut" as const,
					delay: 0.1,
				},
			},
		};

		const groupPulse: Variants = {
			normal: { scale: 1 },
			animate: {
				scale: [1, 1.02, 1],
				transition: {
					duration: 0.6 * duration,
					ease: "easeInOut" as const,
				},
			},
		};

		return (
			<LazyMotion features={domMin} strict>
				<m.div
					className={cn("inline-flex items-center justify-center", className)}
					onMouseEnter={handleEnter}
					onMouseLeave={handleLeave}
					{...props}
					style={{ color, ...props.style }}
				>
					<m.svg
						className="lucide lucide-cloud-upload-icon lucide-cloud-upload"
						fill="none"
						height={size}
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width={size}
						xmlns="http://www.w3.org/2000/svg"
					>
						<m.g animate={controls} initial="normal" variants={groupPulse}>
							<m.path
								animate={controls}
								d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
								initial="normal"
								strokeDasharray="100"
								strokeDashoffset="100"
								variants={cloudVariants}
							/>
							<m.path
								animate={controls}
								d="M12 13v8"
								initial="normal"
								strokeDasharray="30"
								strokeDashoffset="30"
								variants={shaftVariants}
							/>
							<m.path animate={controls} d="m8 17 4-4 4 4" initial="normal" variants={headVariants} />
						</m.g>
					</m.svg>
				</m.div>
			</LazyMotion>
		);
	}
);

CloudUploadIcon.displayName = "CloudUploadIcon";
export { CloudUploadIcon };
