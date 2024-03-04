import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server';
import argon2 from 'argon2';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const existingUser = await prisma.user.findFirst({
			where: {
				email
			},
			select: {
				id: true
			}
		});

		if (existingUser) {
			return fail(400, {
				field: 'email',
				suggestions: 'this email is already in use',
				return: { email }
			});
		}

		// TODO: more verification
		// TODO: should passwords be returned?

		if (password.length < 8) {
			return fail(400, {
				field: 'password',
				suggestions: 'DO BETTER',
				return: { email }
			});
		}

		const passwordHash = await argon2.hash(password);

		await prisma.user.create({
			data: {
				email,
				password: passwordHash
			}
		});

		throw redirect(302, '/login');
	}
} satisfies Actions;
