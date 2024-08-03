import type { Actor, User } from '@prisma/client';

export { default as createPost } from './createPost';
export { default as generateUsername } from './generateUsername';
export { default as prisma } from './prisma';
export * from './session';
export { default as words } from './words';

export type UserAndActor = User & {
	activeActor: Actor | null
};