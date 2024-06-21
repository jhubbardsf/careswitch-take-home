import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: {
			id: params.id
		}
	});

	return { user };
};
