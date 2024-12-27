import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	// TODO: authentication

	if (!locals.user) {
		throw error(404);
	}

	const post = await prisma.post.findUnique({
		where: {
			id: params.id
		},
		select: {
			voteScore: true
		}
	});

	if (!post) throw error(404)


	const vote = await prisma.vote.findUnique({
		where: {
			postId_userId: {
				postId: params.id,
				userId: locals.user.id
			}
		},
		select: {
			up: true
		}
	});

	return json({ score: post.voteScore, myVote: vote?.up });
};