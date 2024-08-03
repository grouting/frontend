import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server';
import argon2 from 'argon2';
import { nanoid } from 'nanoid';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user = await prisma.user.findFirst({
			where: {
				email: email.toLocaleLowerCase()
			},
			select: {
				id: true,
				password: true
			}
		});

		if (!user) {
			return fail(401, {
				field: 'email',
				suggestions: 'email not in use',
				return: { email }
			});
		}

		if (!(await argon2.verify(user.password, password))) {
			return fail(401, {
				field: 'email',
				suggestions: 'email not in use',
				return: { email }
			});
		}

		const secondsUntilExpiration = 60 * 60 * 24 * 7 * 2; // 2 weeks
		const validUntil = new Date(Date.now() + 1000 * secondsUntilExpiration);
		const sessionToken = nanoid();

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				sessions: {
					create: {
						validUntil,
						sessionToken
					}
				}
			}
		});

		cookies.set('session_id', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			expires: validUntil
		});

		throw redirect(302, '/dashboard');
	}
} satisfies Actions;
