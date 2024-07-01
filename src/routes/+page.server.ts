import { prisma } from '$lib/server/db';
import { getMonthlyCounts, getThisMonthsCounts, getUserWorkspaceStats } from '$lib/server/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Data Test
	try {
		const userWorkspaceAddedPerMonth = await getMonthlyCounts(2024);
		const { users, workspaces } = await getThisMonthsCounts();
		const { totalUsers, totalWorkspaces, newUsers, newWorkspaces } = await getUserWorkspaceStats();
		console.log({ userWorkspaceAddedPerMonth, users, workspaces });

		return {
			userWorkspaceAddedPerMonth,
			users,
			workspaces,
			totalUsers,
			totalWorkspaces,
			newUsers,
			newWorkspaces
		};
	} catch (error) {
		console.error('Error:', error);
		return {};
	}
}) satisfies PageServerLoad;
