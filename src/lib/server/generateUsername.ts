import words from "./words";
import prisma from "./prisma";

export default async function generateUsername(): Promise<string> {
	const username = getWord() + getWord();

	const existingUsername = await prisma.actor.findFirst({
		where: {
			username
		}
	});

	if (existingUsername) {
		return await generateUsername();
	}

	return username;
}

function getWord(): string {
	return capitalizeFirstLetter(words[Math.floor(Math.random() * words.length)]);
}

function capitalizeFirstLetter(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}