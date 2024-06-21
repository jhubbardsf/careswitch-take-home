import { prisma } from '$lib/server/db';

export const load = async () => {
	const users = await prisma.user.findMany();

	return { users };
};
