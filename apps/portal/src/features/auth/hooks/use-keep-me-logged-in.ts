"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ziron.keepMeLoggedIn";

export const useKeepMeLoggedIn = () => {
	const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(() => {
		if (typeof window === "undefined") {
			return true;
		}

		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored === null) {
				return true;
			}

			return stored === "true";
		} catch {
			return true;
		}
	});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		try {
			window.localStorage.setItem(STORAGE_KEY, keepMeLoggedIn ? "true" : "false");
		} catch {
			// Ignore storage errors (e.g. private mode, quota exceeded).
		}
	}, [keepMeLoggedIn]);

	return {
		keepMeLoggedIn,
		setKeepMeLoggedIn,
	};
};
