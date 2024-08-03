import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(404);
	}

	const post = await prisma.post.findUnique({
		where: {
			id: params.id,
		},
		select: {
			children: {
				select: {
					id: true,
					author: {
						select: {
							username: true
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
			}
		}
	});


	if (!post) {
		throw error(404);
	}

	return json(post.children);
};