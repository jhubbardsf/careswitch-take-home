import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const workspaces = await prisma.workspace.findMany({ include: { users: true } });

	return { workspaces };
};
