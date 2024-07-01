import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const workspace = await prisma.workspace.findFirst({
		where: {
			id: Number(params.id)
		},
		include: {
			users: true
		}
	});

	return { workspace };
};
