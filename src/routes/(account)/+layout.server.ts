import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma, generateUsername, fetchSession, fetchUser } from '$lib/server';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	let profile = await fetchUser(await fetchSession(locals.sessionToken));

	if (!profile) {
		throw redirect(307, '/login');
	}

	const activeActor = profile.activeActor;

	if (!activeActor || activeActor.executionDate.getTime() < Date.now()) {
		profile = {
			...profile,
			activeActor: (await createNewActor(profile.id)).activeActor
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
		include: {
			activeActor: true
		}
	});

	return updatedUser;
}
