import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
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

	return json(posts);
};

type Posts = {
	id: string;
	postedAt: Date;
	content: string;
	author: {
		username: string;
	};
	tags: {
		name: string;
	}[];
	_count: {
		children: number;
	};
}[];

export type { Posts };