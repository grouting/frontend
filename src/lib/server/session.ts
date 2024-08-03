import type { Session } from '@prisma/client';
import prisma from './prisma';
import type { UserAndActor } from '.';

export async function deleteSession(id: string): Promise<void> {
	await prisma.session.delete({
		where: {
			id
		}
	});
}

export async function fetchSession(sessionToken: string | undefined): Promise<Session | null> {
	if (!sessionToken) return null;

	const session = await prisma.session.findUnique({
		where: {
			sessionToken
		}
	});

	return session;
}

export async function fetchUser(session: Session | null): Promise<UserAndActor | null> {
	if (!session) return null;

	const user = await prisma.user.findUnique({
		where: {
			id: session.userId
		},
		include: {
			activeActor: true
		}
	});

	if (!user) return null;

	return user;
}