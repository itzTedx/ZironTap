"use client";

import { useIsLoggedIn } from "../hooks/use-is-logged-in";

interface IsLoggedInProps extends React.ComponentProps<"div"> {}

export const IsLoggedIn = ({ children }: IsLoggedInProps) => {
	const { isLoggedIn } = useIsLoggedIn();

	return isLoggedIn ? children : null;
};
