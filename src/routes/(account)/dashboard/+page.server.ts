import type { Actions, PageServerLoad } from './$types';
import { createPost } from '$lib/server';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const content = data.get('post') as string;

		return await createPost(content, locals.sessionToken as string);
	}
} satisfies Actions;

export const load = (async () => {
	// TODO: authorization to explain why the api doesn't return anything
}) satisfies PageServerLoad;

