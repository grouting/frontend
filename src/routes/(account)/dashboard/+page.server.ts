import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const content = data.get('post') as string;

		const tagIds = await findTagIdsInPost(content);

		const session = await prisma.session.findUnique({
			where: {
				sessionToken: locals.sessionToken
			},
			select: {
				user: {
					select: {
						activeActor: {
							select: {
								id: true,
								username: true
							}
						}
					}
				}
			}
		});

		const actor = session!.user.activeActor!;

		const post = await prisma.post.create({
			data: {
				content,
				voteScore: 0,
				author: {
					connect: {
						id: actor.id
					}
				},
				tags: {
					connect: tagIds
				}
			},
			select: {
				id: true,
				content: true,
				postedAt: true,
				tags: {
					select: {
						name: true
					}
				},
				author: {
					select: {
						username: true
					}
				}
			}
		});

		return {
			ok: true,
			post
		};
	}
} satisfies Actions;

export const load = (async () => {
	const posts = await prisma.post.findMany({
		select: {
			id: true,
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
	});

	return { posts };
}) satisfies PageServerLoad;

type IdObject = { id: string };

async function findTagIdsInPost(post: string): Promise<IdObject[]> {
	const tagIds = [];

	for (const match of post.matchAll(/#[A-Za-z]+/g)) {
		if (tagIds.length >= 3) break;

		const tagName = match[0].substring(1).toLocaleLowerCase();

		let tag = await prisma.tag.findUnique({
			where: {
				name: tagName
			},
			select: {
				id: true
			}
		});

		if (!tag) {
			tag = await prisma.tag.create({
				data: {
					name: tagName
				},
				select: {
					id: true,
					name: true
				}
			});
		}

		tagIds.push({ id: tag.id });
	}

	return tagIds;
}
