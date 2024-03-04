import { prisma } from '$lib/server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const sessionToken = cookies.get('session_id');

	if (!sessionToken) {
		return { loggedIn: false };
	}
	
	const session = await prisma.session.findUnique({
		where: {
			sessionToken
		}
	});

	if (!session) {
		return { loggedIn: false };
	}

	// TODO: do more verification
	if (session.validUntil < new Date(Date.now())) {
		await deleteSession(session.id);
		return { loggedIn: false };
	}

	return { loggedIn: true };
}) satisfies LayoutServerLoad;

async function deleteSession(id: string): Promise<void> {
	await prisma.session.delete({
		where: {
			id,
		}
	});
}