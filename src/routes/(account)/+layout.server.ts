import { prisma } from '$lib/server';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies, parent }) => {
	if (!(await parent()).loggedIn) {
		throw redirect(307, '/login');
	}

	const sessionToken = cookies.get('session_id');

	const profile = await prisma.session.findUnique({
		where: {
			sessionToken,
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
							executionDate: true,
						}
					}
				}
			}
		}
	})

	if (!profile) {
		throw redirect(307, '/login');
	}

    return profile;
}) satisfies LayoutServerLoad;