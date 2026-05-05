"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useProximityHover } from "@ziron/ui/hooks/use-proximity-hover";
import { fontWeights } from "@ziron/ui/lib/font-weight";
import type { IconComponent } from "@ziron/ui/lib/icon-context";
import { useShape } from "@ziron/ui/lib/shape-context";
import { springs } from "@ziron/ui/lib/springs";
import { cn } from "@ziron/ui/lib/utils";

interface TabsSubtleContextValue {
	registerTab: (index: number, element: HTMLElement | null) => void;
	hoveredIndex: number | null;
	selectedIndex: number;
	onSelect: (index: number) => void;
	idPrefix: string;
	activeLabel: boolean;
}

const TabsSubtleContext = createContext<TabsSubtleContextValue | null>(null);

function useTabsSubtle() {
	const ctx = useContext(TabsSubtleContext);
	if (!ctx) throw new Error("useTabsSubtle must be used within a TabsSubtle");
	return ctx;
}

interface TabsSubtleProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
	children: ReactNode;
	selectedIndex: number;
	onSelect: (index: number) => void;
	idPrefix?: string;
	/** When true, only the selected tab shows its text label. Requires icons on tabs. */
	activeLabel?: boolean;
}

const TabsSubtle = forwardRef<HTMLDivElement, TabsSubtleProps>(
	({ children, selectedIndex, onSelect, idPrefix: idPrefixProp, activeLabel = false, className, ...props }, ref) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const isMouseInside = useRef(false);
		const generatedId = useId();
		const shape = useShape();
		const idPrefix = idPrefixProp || generatedId;

		const {
			activeIndex: hoveredIndex,
			setActiveIndex: setHoveredIndex,
			itemRects: tabRects,
			handlers,
			registerItem,
			measureItems: measureTabs,
		} = useProximityHover(containerRef, { axis: "x" });

		// Track tab elements locally so we can observe their individual resizes
		const tabElementsRef = useRef(new Map<number, HTMLElement>());
		const registerTab = useCallback(
			(index: number, element: HTMLElement | null) => {
				registerItem(index, element);
				if (element) {
					tabElementsRef.current.set(index, element);
				} else {
					tabElementsRef.current.delete(index);
				}
			},
			[registerItem]
		);

		useEffect(() => {
			measureTabs();
		}, [measureTabs]);

		// Observe individual tab buttons for resize (label expand/collapse in activeLabel mode)
		useEffect(() => {
			const elements = tabElementsRef.current;
			if (elements.size === 0) return;
			const ro = new ResizeObserver(() => measureTabs());
			elements.forEach((el) => ro.observe(el));
			return () => ro.disconnect();
		}, [measureTabs]);

		// Wrap handlers to track isMouseInside
		const handleMouseMove = useCallback(
			(e: React.MouseEvent) => {
				isMouseInside.current = true;
				handlers.onMouseMove(e);
			},
			[handlers]
		);

		const handleMouseLeave = useCallback(() => {
			isMouseInside.current = false;
			handlers.onMouseLeave();
		}, [handlers]);

		const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

		const selectedRect = tabRects[selectedIndex];
		const hoverRect = hoveredIndex !== null ? tabRects[hoveredIndex] : null;
		const focusRect = focusedIndex !== null ? tabRects[focusedIndex] : null;
		const isHoveringSelected = hoveredIndex === selectedIndex;
		const isHovering = hoveredIndex !== null && !isHoveringSelected;

		return (
			<TabsSubtleContext.Provider
				value={{ registerTab, hoveredIndex, selectedIndex, onSelect, idPrefix, activeLabel }}
			>
				<div
					className={cn(
						"scrollbar-hide relative -my-1 flex max-w-full select-none items-center gap-0.5 overflow-x-auto py-1",
						className
					)}
					onBlur={(e) => {
						if (containerRef.current?.contains(e.relatedTarget as Node)) return;
						setFocusedIndex(null);
						if (isMouseInside.current) return;
						setHoveredIndex(null);
					}}
					onFocus={(e) => {
						const indexAttr = (e.target as HTMLElement)
							.closest("[data-proximity-index]")
							?.getAttribute("data-proximity-index");
						if (indexAttr != null) {
							const idx = Number(indexAttr);
							setHoveredIndex(idx);
							setFocusedIndex((e.target as HTMLElement).matches(":focus-visible") ? idx : null);
						}
					}}
					onKeyDown={(e) => {
						const items = Array.from(
							containerRef.current?.querySelectorAll('[role="tab"]') ?? []
						) as HTMLElement[];
						const currentIdx = items.indexOf(e.target as HTMLElement);
						if (currentIdx === -1) return;

						if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
							e.preventDefault();
							const next = ["ArrowRight", "ArrowDown"].includes(e.key)
								? (currentIdx + 1) % items.length
								: (currentIdx - 1 + items.length) % items.length;
							items[next]?.focus();
						} else if (e.key === "Home") {
							e.preventDefault();
							items[0]?.focus();
						} else if (e.key === "End") {
							e.preventDefault();
							items[items.length - 1]?.focus();
						}
					}}
					onMouseLeave={handleMouseLeave}
					onMouseMove={handleMouseMove}
					ref={(node) => {
						(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
						if (typeof ref === "function") ref(node);
						else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
					}}
					role="tablist"
					{...props}
				>
					{/* Selected pill */}
					{selectedRect && (
						<motion.div
							animate={{
								left: selectedRect.left,
								width: selectedRect.width,
								top: selectedRect.top,
								height: selectedRect.height,
								opacity: isHovering ? 0.8 : 1,
							}}
							className={cn("pointer-events-none absolute bg-selected/50 dark:bg-accent/40", shape.bg)}
							initial={false}
							transition={{
								...springs.moderate,
								opacity: { duration: 0.08 },
							}}
						/>
					)}

					{/* Hover pill */}
					<AnimatePresence>
						{hoverRect && !isHoveringSelected && selectedRect && (
							<motion.div
								animate={{
									left: hoverRect.left,
									width: hoverRect.width,
									top: hoverRect.top,
									height: hoverRect.height,
									opacity: 0.4,
								}}
								className={cn("pointer-events-none absolute bg-accent/60 dark:bg-accent/30", shape.bg)}
								exit={
									!isMouseInside.current && selectedRect
										? {
												left: selectedRect.left,
												width: selectedRect.width,
												top: selectedRect.top,
												height: selectedRect.height,
												opacity: 0,
												transition: { ...springs.moderate, opacity: { duration: 0.06 } },
											}
										: { opacity: 0, transition: { duration: 0.06 } }
								}
								initial={{
									left: selectedRect.left,
									width: selectedRect.width,
									top: selectedRect.top,
									height: selectedRect.height,
									opacity: 0,
								}}
								transition={{
									...springs.fast,
									opacity: { duration: 0.08 },
								}}
							/>
						)}
					</AnimatePresence>

					{/* Focus ring */}
					<AnimatePresence>
						{focusRect && (
							<motion.div
								animate={{
									left: focusRect.left - 2,
									top: focusRect.top - 2,
									width: focusRect.width + 4,
									height: focusRect.height + 4,
								}}
								className={cn(
									"pointer-events-none absolute z-20 border border-[#6B97FF]",
									shape.focusRing
								)}
								exit={{ opacity: 0, transition: { duration: 0.06 } }}
								initial={false}
								transition={{
									...springs.fast,
									opacity: { duration: 0.08 },
								}}
							/>
						)}
					</AnimatePresence>

					{children}
				</div>
			</TabsSubtleContext.Provider>
		);
	}
);

TabsSubtle.displayName = "TabsSubtle";

interface TabsSubtleItemProps extends HTMLAttributes<HTMLButtonElement> {
	icon?: IconComponent;
	label: string;
	index: number;
}

const TabsSubtleItem = forwardRef<HTMLButtonElement, TabsSubtleItemProps>(
	({ icon: Icon, label, index, className, ...props }, ref) => {
		const internalRef = useRef<HTMLButtonElement>(null);
		const shape = useShape();
		const { registerTab, hoveredIndex, selectedIndex, onSelect, idPrefix, activeLabel } = useTabsSubtle();

		useEffect(() => {
			registerTab(index, internalRef.current);
			return () => registerTab(index, null);
		}, [index, registerTab]);

		const isSelected = selectedIndex === index;
		const isActive = hoveredIndex === index || isSelected;
		const collapseLabel = activeLabel && !!Icon;
		const showLabel = !collapseLabel || isSelected;

		const labelContent = (
			<span className="inline-grid whitespace-nowrap text-[13px]">
				<span
					aria-hidden="true"
					className="invisible col-start-1 row-start-1"
					style={{ fontVariationSettings: fontWeights.semibold }}
				>
					{label}
				</span>
				<span
					className={cn(
						"col-start-1 row-start-1 transition-[color,font-variation-settings] duration-80",
						isActive ? "text-foreground" : "text-muted-foreground"
					)}
					style={{
						fontVariationSettings: isSelected ? fontWeights.semibold : fontWeights.normal,
					}}
				>
					{label}
				</span>
			</span>
		);

		return (
			<button
				aria-controls={`${idPrefix}-panel-${index}`}
				aria-label={collapseLabel && !showLabel ? label : undefined}
				aria-selected={isSelected}
				className={cn(
					"relative z-10 flex cursor-pointer items-center border-none bg-transparent px-3 py-2 outline-none",
					collapseLabel ? "h-8" : "gap-2",
					shape.bg,
					className
				)}
				data-proximity-index={index}
				id={`${idPrefix}-tab-${index}`}
				onClick={() => onSelect(index)}
				ref={(node) => {
					(internalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
				}}
				role="tab"
				tabIndex={isSelected ? 0 : -1}
				{...props}
			>
				{Icon && (
					<Icon
						className={cn(
							"shrink-0 transition-[color,stroke-width] duration-80",
							isActive ? "text-foreground" : "text-muted-foreground"
						)}
						size={16}
						strokeWidth={isActive ? 2 : 1.5}
					/>
				)}
				{collapseLabel ? (
					<AnimatePresence initial={false}>
						{showLabel && (
							<motion.span
								animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
								className="overflow-hidden"
								exit={{ width: 0, opacity: 0, marginLeft: 0 }}
								initial={{ width: 0, opacity: 0, marginLeft: 0 }}
								key="label"
								transition={{
									...springs.fast,
									opacity: { duration: 0.06 },
								}}
							>
								{labelContent}
							</motion.span>
						)}
					</AnimatePresence>
				) : (
					labelContent
				)}
			</button>
		);
	}
);

TabsSubtleItem.displayName = "TabsSubtleItem";

interface TabsSubtlePanelProps extends HTMLAttributes<HTMLDivElement> {
	index: number;
	selectedIndex: number;
	idPrefix: string;
	children: ReactNode;
}

const TabsSubtlePanel = forwardRef<HTMLDivElement, TabsSubtlePanelProps>(
	({ index, selectedIndex, idPrefix, children, className, ...props }, ref) => {
		const isSelected = selectedIndex === index;

		return (
			<div
				aria-labelledby={`${idPrefix}-tab-${index}`}
				className={cn("outline-none", className)}
				hidden={!isSelected}
				id={`${idPrefix}-panel-${index}`}
				ref={ref}
				role="tabpanel"
				tabIndex={-1}
				{...props}
			>
				{isSelected && children}
			</div>
		);
	}
);

TabsSubtlePanel.displayName = "TabsSubtlePanel";

export { TabsSubtle, TabsSubtleItem, TabsSubtlePanel };
export default TabsSubtle;
