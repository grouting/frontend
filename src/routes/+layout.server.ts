import type { LayoutServerLoad } from './$types';
import { fetch } from '$lib/server/backend';

export const load = (async (event) => {
	const { error, response, data } = await fetch('/me/profile', 'GET', undefined, event.fetch, event.cookies);

	if (response?.status !== 200 || error) {
		event.cookies.delete('session_id', { path: '/' });
		return { loggedIn: false };
	}

	return { loggedIn: true, user: data };
}) satisfies LayoutServerLoad;