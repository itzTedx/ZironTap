"use client";

import type { ComponentProps } from "react";

import { Button } from "@ziron/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@ziron/ui/components/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPanel,
	DrawerPopup,
	DrawerTitle,
	DrawerTrigger,
} from "@ziron/ui/components/drawer";
import { Form } from "@ziron/ui/components/form";
import { useMediaQuery } from "@ziron/ui/hooks/use-media-query";

const FORM_TITLE = "Edit profile";
const TRIGGER_LABEL = "Open";
const CANCEL_LABEL = "Cancel";
const SAVE_LABEL = "Save";

interface DialogDrawerProps {
	children: React.ReactNode;
	title: string;
	description?: string;
	trigger: React.ReactNode;
	buttonProps?: ComponentProps<typeof Button>;
	cancelLabel?: string;
	saveLabel?: string;
	onCancel?: () => void;
	onSave?: () => void;
}

export function DialogDrawer({
	children,
	title = FORM_TITLE,
	description,
	trigger = TRIGGER_LABEL,
	buttonProps = { variant: "outline" },
	cancelLabel = CANCEL_LABEL,
	saveLabel = SAVE_LABEL,
	onCancel,
	onSave,
}: DialogDrawerProps) {
	const isMobile = useMediaQuery("max-md");

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger render={<Button {...buttonProps} />}>{trigger}</DrawerTrigger>
				<DrawerPopup showBar>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						{description && <DrawerDescription>{description}</DrawerDescription>}
					</DrawerHeader>
					<Form className="contents">
						<DrawerPanel className="grid gap-4" scrollable={false}>
							{children}
						</DrawerPanel>
						<DrawerFooter>
							<DrawerClose render={<Button onClick={onCancel} variant="ghost" />}>
								{cancelLabel}
							</DrawerClose>
							<Button onClick={onSave}>{saveLabel}</Button>
						</DrawerFooter>
					</Form>
				</DrawerPopup>
			</Drawer>
		);
	}

	return (
		<Dialog>
			<DialogTrigger render={<Button {...buttonProps} />}>{trigger}</DialogTrigger>
			<DialogPopup className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<Form className="contents">
					<DialogPanel className="grid gap-4">{children}</DialogPanel>
					<DialogFooter>
						<DialogClose render={<Button onClick={onCancel} variant="ghost" />}>{cancelLabel}</DialogClose>
						<Button onClick={onSave}>{saveLabel}</Button>
					</DialogFooter>
				</Form>
			</DialogPopup>
		</Dialog>
	);
}
