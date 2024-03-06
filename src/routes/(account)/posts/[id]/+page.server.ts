import { prisma, createPost } from '$lib/server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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
			children: {
				select: {
					id: true,
					author: {
						select: {
							username: true
						}
					},
					postedAt: true,
					tags: true,
					voteScore: true,
					content: true,
					_count: {
						select: {
							children: true,
						}
					}
				}
			},
			parent: {
				select: {
					id: true,
				}
			},
			_count: {
				select: {
					children: true,
				}
			}
		}
	});

	if (!post) {
		throw error(404);
	}

	if (post?.parent !== null) {
		// TODO: return stack of traversed tree to get to post so it can be found when requested
		const rootPostId = await findRootPostId(post.parent.id);
		throw redirect(303, `/posts/${rootPostId}`);
	}

	return { post };
}) satisfies PageServerLoad;

async function findRootPostId(postId: string): Promise<string> {
	const post = await prisma.post.findUnique({
		where: {
			id: postId
		},
		select: {
			parent: {
				select: {
					id: true
				}
			}
		}
	});

	if (post?.parent !== null) {
		return await findRootPostId(post!.parent.id);
	}

	return postId;
}

export const actions = {
	default: async ({ request, locals, params }) => {
		const data = await request.formData();
		const content = data.get('post') as string;

		// TODO: verification

		return await createPost(content, locals.sessionToken as string, params.id);
	}
} satisfies Actions;