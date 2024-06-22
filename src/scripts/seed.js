import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	await prisma.$transaction(async (txn) => {
		const workspaces = await txn.workspace.createMany({
			data: [
				{
					name: 'Workspace 1',
					avatar: 'https://api.multiavatar.com/456.svg',
					description: 'Workspace 1 Description'
				},
				{
					name: 'Workspace 2',
					avatar: 'https://api.multiavatar.com/456.svg',
					description: 'Workspace 2 Description'
				}
			]
		});

		const alice = await txn.user.create({
			data: {
				name: 'Alice',
				email: 'alice@careswitch.com',
				avatar: 'https://api.multiavatar.com/456.svg'
			}
		});
		const bob = await txn.user.create({
			data: {
				name: 'Bob',
				email: 'bob@careswitch.com',
				avatar: 'https://api.multiavatar.com/123.svg'
			}
		});

		// const alice = await txn.user.findUnique({ where: { email: 'alice@careswitch.com' } });
		// const bob = await txn.user.findUnique({ where: { email: 'bob@careswitch.com' } });

		// console.log(`Created users: ${JSON.stringify(users)}`);
		console.log(`Created workspaces: ${JSON.stringify(workspaces)}`);
		console.log({ alice, bob });
	});

	// Step 1: Find Alice's user ID
	// Assuming 'name' is a field in your 'User' model
	const alice = await prisma.user.findUnique({
		where: {
			id: 1 // Assuming '1' is Alice's ID
		}
	});

	if (!alice) {
		console.log('Alice not found');
		return;
	}

	// Step 2: Update Alice's workspace relation
	// Assuming 'workspaceId' is the field in your 'User' model that links to a Workspace
	const updatedAlice = await prisma.user.update({
		where: {
			id: alice.id // Use Alice's ID found in step 1
		},
		data: {
			workspaces: {
				connect: [{ id: 1 }] // Assuming '1' is the ID of the workspace you want to attach Alice to
			}
		}
	});

	console.log('Alice has been attached to workspace 1:', updatedAlice);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
