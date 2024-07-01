import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const workspaceNames = [
	'TechInnovate',
	'GreenEarth',
	'HealthPlus',
	'EduSphere',
	'FinanceHub',
	'ArtisanWorks',
	'FitnessPro',
	'TravelEase',
	'FoodieDelight',
	'MediaMasters',
	'DataDriven',
	'EcoSolutions',
	'SmartHome',
	'PetLovers',
	'FashionForward',
	'MusicMakers',
	'CodeCrafters',
	'SportsUnited',
	'BookWorms',
	'CareerLaunch',
	'GardenGuru',
	'MovieBuffs',
	'LanguageLab',
	'DIYNetwork',
	'MarketMaven',
	'ScienceSpot',
	'GamersUnite',
	'VolunteerVision',
	'ParentConnect',
	'ArtGallery'
];

function getRandomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
	const startDate = new Date('2024-01-01');
	const endDate = new Date();

	// Generate 30 random workspaces
	const workspaces = await Promise.all(
		workspaceNames.map(async (name) => {
			return prisma.workspace.create({
				data: {
					name,
					avatar: `https://api.multiavatar.com/${faker.string.alphanumeric(10)}.svg`,
					description: faker.lorem.sentence(),
					createdAt: getRandomDate(startDate, endDate)
				}
			});
		})
	);

	console.log(`Created ${workspaces.length} workspaces`);

	// Generate 100 random users
	const users = await Promise.all(
		Array.from({ length: 100 }, async () => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			return prisma.user.create({
				data: {
					name: `${firstName} ${lastName}`,
					email: faker.internet.email({ firstName, lastName }),
					avatar: `https://api.multiavatar.com/${faker.string.alphanumeric(10)}.svg`,
					createdAt: getRandomDate(startDate, endDate),
					workspaces: {
						connect: faker.helpers
							.arrayElements(workspaces, { min: 0, max: 3 })
							.map((w) => ({ id: w.id }))
					}
				}
			});
		})
	);

	console.log(`Created ${users.length} users`);

	// Log some sample data
	console.log('Sample workspace:', workspaces[0]);
	console.log('Sample user:', users[0]);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
