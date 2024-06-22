import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	const workspaces = await prisma.$transaction(async (txn) => {
		await txn.workspace.deleteMany();
		return await txn.workspace.createManyAndReturn({
			data: [{ name: 'Workspace 1' }, { name: 'Workspace 2' }]
		});
	});

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
