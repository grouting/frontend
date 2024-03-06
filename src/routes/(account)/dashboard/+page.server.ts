import type { Actions, PageServerLoad } from './$types';
import { prisma, createPost } from '$lib/server';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const content = data.get('post') as string;

		return await createPost(content, locals.sessionToken as string);
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
			},
			_count: {
				select: {
					children: true,
				}
			}
		},
		where: {
			parent: null
		},
		orderBy: {
			postedAt: 'desc'
		}
	});

	return { posts };
}) satisfies PageServerLoad;

