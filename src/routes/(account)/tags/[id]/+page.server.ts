import { prisma } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = params.id;

	const posts = await prisma.tag.findFirst({
		where: {
			name: id
		},
		select: {
			postsUsingTag: {
				select: {
					content: true,
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
					}
				},
				orderBy: {
					postedAt: 'desc'
				}
			},
			_count: true
		}
	});

	if (!posts) {
		return error(404);
	}

	return {
		posts: posts.postsUsingTag,
		count: posts._count.postsUsingTag,
		tag: params.id
	};
}) satisfies PageServerLoad;
