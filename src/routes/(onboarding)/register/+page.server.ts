import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { BACKEND_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = await data.get('email');
		const password = await data.get('password');

		const result = await fetch(`${BACKEND_URI}/register`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (result.status !== 200) {
			return await result.json();
		}

		throw redirect(302, '/login');
	},
} satisfies Actions;