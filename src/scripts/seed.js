import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	await prisma.$transaction(async (txn) => {
		const workspaces = await txn.workspace.createMany({
			data: [{ name: 'Workspace 1' }, { name: 'Workspace 2' }]
		});

		const users = await txn.user.createMany({
			data: [
				{ name: 'Alice', email: 'alice@careswitch.com' },
				{ name: 'Bob', email: 'bob@careswitch.com' }
			]
		});

		const alice = await txn.user.findUnique({ where: { email: 'alice@careswitch.com' } });
		const bob = await txn.user.findUnique({ where: { email: 'bob@careswitch.com' } });

		console.log(`Created users: ${JSON.stringify(users)}`);
		console.log(`Created workspaces: ${JSON.stringify(workspaces)}`);
	});
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
