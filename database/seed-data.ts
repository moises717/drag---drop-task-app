interface SeedData {
	entries: SeedEntry[];
}

interface SeedEntry {
	description: string;
	status: string;
	createdAt: number;
}

export const seedData: SeedData = {
	entries: [
		{
			description:
				'quod facilis doloribus pariatur ea! Voluptatibus, deleniti quibusdam voluptate animi qui consequuntur laboriosam dolore.',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			description:
				'quod facilis doloribus pariatur ea! Voluptatibus, deleniti quibusdam voluptate animi qui consequuntur laboriosam dolore.',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			description:
				'quod facilis doloribus pariatur ea! Voluptatibus, deleniti quibusdam voluptate animi qui consequuntur laboriosam dolore.',
			status: 'in-progress',
			createdAt: Date.now(),
		},
	],
};
