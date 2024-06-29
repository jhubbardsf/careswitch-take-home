import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// Data Test
	async function getMonthlyCountsJanToJul(year: number) {
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

		const results = await Promise.all(
			monthNames.map(async (monthName, index) => {
				const startDate = new Date(year, index, 1);
				const endDate = new Date(year, index + 1, 0);

				const userCount = await prisma.user.count({
					where: {
						createdAt: {
							gte: startDate,
							lt: endDate
						}
					}
				});

				const workspaceCount = await prisma.workspace.count({
					where: {
						createdAt: {
							gte: startDate,
							lt: endDate
						}
					}
				});

				return {
					month: monthName,
					userCount,
					workspaceCount
				};
			})
		);

		return results;
	}

	// Example usage

	try {
		const results = await getMonthlyCountsJanToJul(2024);
		console.log(results);
		return { results };
	} catch (error) {
		console.error('Error:', error);
		return {};
	}
}) satisfies PageServerLoad;
