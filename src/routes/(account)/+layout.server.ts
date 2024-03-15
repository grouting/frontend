import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma, generateUsername } from '$lib/server';

export const load = (async ({ locals }) => {
	if (!locals.loggedIn) {
		throw redirect(307, '/login');
	}

	const profile = await prisma.session.findUnique({
		where: {
			sessionToken: locals.sessionToken
		},
		select: {
			user: {
				select: {
					id: true,
					email: true,
					role: true,
					preferences: true,
					activeActor: {
						select: {
							username: true,
							createdAt: true,
							executionDate: true
						}
					}
				}
			}
		}
	});

	if (!profile) {
		throw redirect(307, '/login');
	}

	const activeActor = profile.user.activeActor;

	if (!activeActor || activeActor.executionDate.getTime() < Date.now()) {
		profile.user = {
			...profile.user,
			activeActor: (await createNewActor(profile.user.id)).activeActor
		};
	}

	return profile;
}) satisfies LayoutServerLoad;

async function createNewActor(userId: string) {
	const now = Date.now();

	const updatedUser = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			activeActor: {
				create: {
					username: await generateUsername(),
					createdAt: new Date(now),
					executionDate: new Date(now + 1000 * 60 * 60 * 24 * 7)
				}
			}
		},
		select: {
			activeActor: {
				select: {
					username: true,
					createdAt: true,
					executionDate: true
				}
			}
		}
	});

	return updatedUser;
}
