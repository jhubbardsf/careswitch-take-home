import { prisma } from '$lib/server/db';
import { getMonthlyCounts, getThisMonthsCounts } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Data Test
	try {
		const userWorkspaceAddedPerMonth = await getMonthlyCounts(2024);
		const { users, workspaces } = await getThisMonthsCounts();
		console.log({ userWorkspaceAddedPerMonth, users, workspaces });

		return { userWorkspaceAddedPerMonth, users, workspaces };
	} catch (error) {
		console.error('Error:', error);
		return {};
	}
}) satisfies PageServerLoad;
