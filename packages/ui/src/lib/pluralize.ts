export function pluralize(n: number, word: string) {
	return `${n} ${word}${n === 1 ? "" : "s"}`;
}
