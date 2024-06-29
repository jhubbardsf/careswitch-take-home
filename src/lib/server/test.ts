import { prisma } from './db';

// Data test
async function getMonthlyCountsJanToJul(year: number) {
	const startDate = new Date(year, 0, 1); // January 1st
	const endDate = new Date(year, 6, 31); // July 31st

	const userCounts = await prisma.user.groupBy({
		by: [
			{
				month: {
					date: 'createdAt',
					format: '%m' // Month as a number (01-12)
				}
			}
		],
		_count: {
			id: true
		},
		where: {
			createdAt: {
				gte: startDate,
				lte: endDate
			}
		},
		orderBy: {
			month: 'asc'
		}
	});

	const workspaceCounts = await prisma.workspace.groupBy({
		by: [
			{
				month: {
					date: 'createdAt',
					format: '%m' // Month as a number (01-12)
				}
			}
		],
		_count: {
			id: true
		},
		where: {
			createdAt: {
				gte: startDate,
				lte: endDate
			}
		},
		orderBy: {
			month: 'asc'
		}
	});

	// Combine and format the results
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	const results = monthNames.map((monthName, index) => {
		const monthNumber = String(index + 1).padStart(2, '0');
		const userCount = userCounts.find((u) => u.month === monthNumber)?._count.id ?? 0;
		const workspaceCount = workspaceCounts.find((w) => w.month === monthNumber)?._count.id ?? 0;

		return {
			month: monthName,
			userCount,
			workspaceCount
		};
	});

	return results;
}

// Example usage
async function main() {
	try {
		const results = await getMonthlyCountsJanToJul(2024);
		console.log(results);
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
