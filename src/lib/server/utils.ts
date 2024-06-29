import { prisma } from './db';

export async function getMonthlyCounts(year: number, numMonths: number = 7) {
	const results = await Promise.all(
		Array.from({ length: numMonths }, async (_, index) => {
			const date = new Date(year, index, 1);
			const monthName = date.toLocaleString('default', { month: 'long' });

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

export async function getThisMonthsCounts() {
	const now = new Date();
	const lastMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const nextMonth = new Date(now.getFullYear(), now.getMonth(), 31);

	const [userCount, workspaceCount] = await Promise.all([
		prisma.user.count({
			where: {
				createdAt: {
					gte: lastMonth,
					lte: nextMonth
				}
			}
		}),
		prisma.workspace.count({
			where: {
				createdAt: {
					gte: lastMonth,
					lte: nextMonth
				}
			}
		})
	]);

	return { users: userCount, workspaces: workspaceCount };
}

export async function getUserWorkspaceStats() {
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	const stats = await prisma.$transaction(async (tx) => {
		const totalUsers = await tx.user.count();
		const totalWorkspaces = await tx.workspace.count();
		const newUsers = await tx.user.count({
			where: {
				createdAt: {
					gte: thirtyDaysAgo
				}
			}
		});
		const newWorkspaces = await tx.workspace.count({
			where: {
				createdAt: {
					gte: thirtyDaysAgo
				}
			}
		});

		return {
			totalUsers,
			totalWorkspaces,
			newUsers,
			newWorkspaces
		};
	});

	return stats;
}
