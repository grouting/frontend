import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	// TODO: do permissions check
	// TODO: do pagination

	const posts = await prisma.post.findMany({
		where: {
			author: {
				username: params.id
			},
			parent: null
		},
		select: {
			id: true,
			author: {
				select: {
					id: true,
					username: true,
				}
			},
			postedAt: true,
			tags: {
				select: {
					name: true
				}
			},
			voteScore: true,
			content: true,
			_count: {
				select: {
					children: true
				}
			}
		}
	});

	if (!posts) {
		throw error(404);
	}

	return {
		posts
	};
}) satisfies PageServerLoad;
