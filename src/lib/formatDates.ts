const NUMBER_OF_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

export default function toString(date: Date): string {
	if (Date.now() - date.getTime() < NUMBER_OF_MILLISECONDS_IN_A_DAY) {
		return `${date.getHours()}:${date.getMinutes()}`;
	}
	else {
		return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
	}
}