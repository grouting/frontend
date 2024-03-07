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
		const rootPostTrail = await findRootPostTrail([post.parent.id]);
		console.log(rootPostTrail);
		throw redirect(303, `/posts/${rootPostTrail[rootPostTrail.length - 1]}`);
	}

	return { post };
}) satisfies PageServerLoad;

async function findRootPostTrail(trail: string[]): Promise<string[]> {
	const post = await prisma.post.findUnique({
		where: {
			id: trail[trail.length - 1]
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
		// This is not the root post, therefore we need to search deeper
		return await findRootPostTrail([...trail, post!.parent.id]);
	}

	return trail;
}

export const actions = {
	default: async ({ request, locals, params }) => {
		const data = await request.formData();
		const content = data.get('post') as string;
		const replyingTo = data.get('replyingTo');

		if (!replyingTo) {
			return await createPost(content, locals.sessionToken as string, params.id);
		} else {
			// TODO: make sure the post replying to is actually the root as defined in params.id
			return await createPost(content, locals.sessionToken as string, replyingTo as string);
		}

		// TODO: verification

	}
} satisfies Actions;