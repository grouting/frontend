import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	// TODO: do permissions check
	// TODO: do pagination

	const posts = await prisma.post.findMany({
		where: {
			authorId: params.id
		}
	});

	console.log(posts);

	if (!posts) {
		throw error(404);
	}

	return {
		posts
	};
}) satisfies PageServerLoad;
