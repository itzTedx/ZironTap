import { pluralize } from "./pluralize";

export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const isInFuture = diff < 0;
	const absDiff = Math.abs(diff);

	const seconds = Math.floor(absDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 5) return "just now";

	if (isInFuture) {
		if (seconds < 60) return `in ${pluralize(seconds, "second")}`;
		if (minutes < 60) return `in ${pluralize(minutes, "minute")}`;
		if (hours < 24) return `in ${pluralize(hours, "hour")}`;
		if (days < 7) return `in ${pluralize(days, "day")}`;
		return date.toLocaleDateString();
	}

	if (seconds < 60) return `${pluralize(seconds, "second")} ago`;
	if (minutes < 60) return `${pluralize(minutes, "minute")} ago`;
	if (hours < 24) return `${pluralize(hours, "hour")} ago`;
	if (days < 7) return `${pluralize(days, "day")} ago`;
	return date.toLocaleDateString();
}
