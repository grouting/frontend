import { fail } from "@sveltejs/kit";
import prisma from "./prisma";

async function createPost(content: string, sessionToken: string, inReplyToPostId: string | null = null) {
	if (content.length > 500) {
		return fail(400, {
			field: 'post',
			suggestions: 'post is too long',
			return: { post: content }
		});
	}

	const tagIds = await findTagIdsInPost(content);

	// TODO: more verification

	const session = await prisma.session.findUnique({
		where: {
			sessionToken
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

	let replyQuery = undefined;
	if (inReplyToPostId) {
		replyQuery = {
			connect: {
				id: inReplyToPostId
			}
		};
	}

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
			},
			parent: replyQuery
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

export default createPost;

type IdObject = { id: string };

async function findTagIdsInPost(post: string): Promise<IdObject[]> {
	const tagIds: IdObject[] = [];

	for (const match of post.matchAll(/#[A-Za-z]+/g)) {
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

		if (!tagIds.includes(tag)) {
			tagIds.push({ id: tag.id });
		}
	}

	return tagIds;
}
