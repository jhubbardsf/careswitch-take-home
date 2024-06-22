import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	const users = await prisma.$transaction(async (txn) => {
		await txn.user.deleteMany();
		return await txn.user.createManyAndReturn({
			data: [
				{ name: 'Alice', email: 'alice@careswitch.com' },
				{ name: 'Bob', email: 'bob@careswitch.com' }
			]
		});
	});

	console.log(`Created users: ${JSON.stringify(users)}`);
}

seed().finally(async () => {
	await prisma.$disconnect();
});
