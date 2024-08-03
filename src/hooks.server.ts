import type { Handle } from '@sveltejs/kit';
import { deleteSession, fetchSession, fetchUser } from '$lib/server';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session_id');
	const session = await fetchSession(sessionToken);

	if (!session) {
		event.locals.sessionToken = undefined;
		event.locals.user = null;
		event.cookies.delete('session_id', { path: '/' });
		return await resolve(event);
	}

	if (session.validUntil < new Date(Date.now())) {
		await deleteSession(session.id);

		event.locals.sessionToken = undefined;
		event.locals.user = null;
		event.cookies.delete('session_id', { path: '/' });
		return await resolve(event);
	}

	const user = await fetchUser(session);

	event.locals.sessionToken = sessionToken;
	event.locals.user = user;

	return await resolve(event);
};