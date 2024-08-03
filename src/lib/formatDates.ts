const NUMBER_OF_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// FIXME: this is horrible
export default function toString(date_: Date): string {
	const date = new Date(date_); // what
	if (withinLast6Hours(date)) {
		return `${date.getHours()}:${date.getMinutes()}`;
	} else {
		return `${format(date.getDate())}/${format(date.getMonth())}/${date.getFullYear()} ${format(
			date.getHours()
		)}:${format(date.getMinutes())}`;
	}
}

function format(value: number): string {
	return value.toString().padStart(2, '0');
}

function withinLast6Hours(date: Date): boolean {
	return Date.now() - date.getTime() < NUMBER_OF_MILLISECONDS_IN_A_DAY / 2;
}