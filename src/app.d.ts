import type { UserAndActor } from "$lib/server";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sessionToken: string | undefined;
			user: UserAndActor | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
