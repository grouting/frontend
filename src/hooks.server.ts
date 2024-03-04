import type { Handle } from '@sveltejs/kit';
import { prisma, deleteSession } from '$lib/server';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session_id');

	if (!sessionToken) {
		event.locals.loggedIn = false;
		return await resolve(event);
	}
	
	const session = await prisma.session.findUnique({
		where: {
			sessionToken
		}
	});

	if (!session) {
		event.locals.loggedIn = false;
		return await resolve(event);
	}

	// TODO: do more verification
	if (session.validUntil < new Date(Date.now())) {
		await deleteSession(session.id);
		event.locals.loggedIn = false;
		return await resolve(event);
	}

	event.locals.loggedIn = true;
	event.locals.sessionToken = sessionToken;

	return await resolve(event);
};