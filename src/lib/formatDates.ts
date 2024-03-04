const NUMBER_OF_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

export default function toString(date: Date): string {
	if (Date.now() - date.getTime() < NUMBER_OF_MILLISECONDS_IN_A_DAY) {
		return `${date.getHours()}:${date.getMinutes()}`;
	}
	else {
		return `${format(date.getDate())}/${format(date.getMonth())}/${date.getFullYear()} ${format(date.getHours())}:${format(date.getMinutes())}`
	}
}

function format(value: number): string {
	return value.toString().padStart(2, '0');
}