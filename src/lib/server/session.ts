import prisma from "./prisma";

export async function deleteSession(id: string): Promise<void> {
	await prisma.session.delete({
		where: {
			id,
		}
	});
}
