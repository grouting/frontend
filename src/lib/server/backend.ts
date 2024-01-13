import type { Cookies } from "@sveltejs/kit";
import { BACKEND_URI } from '$env/static/private';

type Data = {
	error: boolean | undefined,
	response: Response | undefined,
	data: unknown | undefined,
};

export async function fetch(path: string, method: string, data: unknown, fetchFn: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>, cookies: Cookies): Promise<Data> {
	const sessionId = cookies.get('session_id');

	if (sessionId === undefined) {
		return { error: true, response: undefined, data: undefined };
	}

	const response = await fetchFn(`${BACKEND_URI}${path}`, {
		method,
		body: JSON.stringify(data),
		headers: {
			Cookie: cookies.serialize('session_id', sessionId, { path: '/' }) // FIXME: hOW iS THIS FUCKING API SO LACKING
		}
	});

	return { error: false, response, data: await response.json() };
}