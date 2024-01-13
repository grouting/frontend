import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import cookie from 'cookie';
import { BACKEND_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const email = await data.get('email');
		const password = await data.get('password');

		const result = await fetch(`${BACKEND_URI}/login`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (result.status !== 200) {
			return await result.json();
		}

		const sessionIdCookie = cookie.parse(result.headers.getSetCookie()[0]);

		// FIXME: should be secure
		cookies.set('session_id', sessionIdCookie.session_id, {
			sameSite: 'strict',
			path: '/',
			expires: new Date(sessionIdCookie.expires),
		});

		throw redirect(302, '/dashboard');
	},
} satisfies Actions;