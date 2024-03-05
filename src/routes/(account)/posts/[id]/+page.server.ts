import { prisma } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// TODO: do permissions etc whatever

	const post = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
		select: {
			id: true,
			author: {
				select: {
					username: true,
					createdAt: true,
					executionDate: true,
				}
			},
			postedAt: true,
			tags: {
				select: {
					name: true,
				}
			},
			voteScore: true,
			content: true,
			parent: true,
		}
	});

	if (!post) {
		throw error(404);
	}

	if (post?.parent !== null) {
		// This is a comment post
	}

	return { post };
}) satisfies PageServerLoad;