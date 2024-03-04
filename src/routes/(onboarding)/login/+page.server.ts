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
				email,
			},
			select: {
				id: true,
				password: true,
			}
		});

		// TODO: more verification

		if (!user) {
			return fail(401, { 
				field: 'email', 
				suggestions: 'email not in use', 
				return: { email } 
			});
		}

		if (!await argon2.verify(user.password, password)) {
			return fail(401, { 
				field: 'email', 
				suggestions: 'email not in use', 
				return: { email } 
			});
		}
		
		const validUntil = new Date(2099, 12);
		const sessionToken = nanoid();

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				sessions: {
					create: {
						validUntil,
						sessionToken,
					}
				}
			}
		});

		// FIXME: should be secure
		cookies.set('session_id', sessionToken, {
			sameSite: 'strict',
			path: '/',
			expires: validUntil, 
		});

		redirect(302, '/dashboard');
	},
} satisfies Actions;