const NUMBER_OF_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

export default function toString(date_: Date): string {
	const date = new Date(date_); // what

	if (withinLast6Hours(date)) {
		return getTime(date);
	} else {
		return `${getDate(date)} ${getTime(date)}`;
	}
}

function getTime(date: Date): string {
	return `${format(date.getHours())}:${format(date.getMinutes())}`;
}

function getDate(date: Date): string {
	return `${format(date.getDate())}/${format(date.getMonth())}/${date.getFullYear()}`;
}

function format(value: number): string {
	return value.toString().padStart(2, '0');
}

function withinLast6Hours(date: Date): boolean {
	return Date.now() - date.getTime() < NUMBER_OF_MILLISECONDS_IN_A_DAY / 2;
}
