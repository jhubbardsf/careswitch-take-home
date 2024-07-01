import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const

	return { users: await prisma.user.findMany({ include: { workspaces: true } }) };
};
