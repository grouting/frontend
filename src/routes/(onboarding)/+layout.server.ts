import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { loggedIn } = await parent();

	if (loggedIn) {
		throw redirect(302, '/dashboard');
	}

	return {};
}) satisfies LayoutServerLoad;
