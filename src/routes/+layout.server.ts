import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return { loggedIn: locals.loggedIn };
}) satisfies LayoutServerLoad;
