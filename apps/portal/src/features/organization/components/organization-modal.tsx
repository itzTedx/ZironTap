"use client";

import React, { useState } from "react";

import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
} from "@ziron/ui/components/alert-dialog";
import { Button } from "@ziron/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPopup,
	DialogTitle,
} from "@ziron/ui/components/dialog";

import { CreateOrganizationForm } from "./form/create-organization-form";

interface OrganizationModalProps extends React.ComponentProps<typeof Button> {
	open: boolean;
	setOpen: (o: boolean) => void;
}

export const OrganizationModal = ({ open, setOpen }: OrganizationModalProps) => {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [formHasValues, setFormHasValues] = useState(false);
	const [formKey, setFormKey] = useState(0);

	return (
		<Dialog
			onOpenChange={(o) => {
				if (!o && formHasValues) {
					setConfirmOpen(true);
				} else {
					setOpen(o);
				}
			}}
			open={open}
		>
			{/* <DialogTrigger className={className} render={<Button {...rest} variant="ghost" />}>
				{children}</DialogTrigger> */}
			<DialogPopup showCloseButton={false}>
				<DialogHeader className="border-b">
					<DialogTitle>Create organization</DialogTitle>
					<DialogDescription>Create a new organization to get started.</DialogDescription>
				</DialogHeader>

				<CreateOrganizationForm
					key={formKey}
					onHasValuesChange={setFormHasValues}
					onSubmit={() => {
						setFormKey((k) => k + 1);
						setFormHasValues(false);
						setOpen(false);
					}}
				>
					<DialogFooter className="px-3 py-2.5">
						<DialogClose render={<Button className="w-full flex-1" variant="secondary" />}>
							Cancel
						</DialogClose>
						<Button className="w-full flex-1" type="submit">
							Create organization
						</Button>
					</DialogFooter>
				</CreateOrganizationForm>
			</DialogPopup>

			{/* Confirmation dialog */}
			<AlertDialog onOpenChange={setConfirmOpen} open={confirmOpen}>
				<AlertDialogPopup>
					<AlertDialogHeader>
						<AlertDialogTitle>Discard changes?</AlertDialogTitle>
						<AlertDialogDescription>Your changes will be lost.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogClose render={<Button variant="ghost" />}>Go back</AlertDialogClose>
						<Button
							onClick={() => {
								setConfirmOpen(false);
								setFormKey((k) => k + 1);
								setFormHasValues(false);
								setOpen(false);
							}}
						>
							Discard
						</Button>
					</AlertDialogFooter>
				</AlertDialogPopup>
			</AlertDialog>
		</Dialog>
	);
};
