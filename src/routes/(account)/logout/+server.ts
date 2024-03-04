import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');

	if (!sessionId) {
		throw redirect(302, '/login');
	}

    cookies.delete('session_id', { path: '/' });
	await deleteSession(sessionId);

    throw redirect(302, '/login');
};