import { z } from 'zod';

const User = z.object({
	name: z.string(),
	email: z.string().email(),
	workspaces: z.array(
		z.object({
			id: z.number().int().positive(),
			name: z.string(),
			createdAt: z.date().default(() => new Date()),
			updatedAt: z.date().default(() => new Date())
		})
	),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date())
});

const Workspace = z.object({
	name: z.string(),
	users: z.array(
		z.object({
			id: z.number().int().positive(),
			name: z.string(),
			email: z.string().email(),
			createdAt: z.date(),
			updatedAt: z.date()
		})
	),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date())
});

// Export the schemas
export { User, Workspace };

// Derive and export the types from the schemas
type UserType = z.infer<typeof User>;
type WorkspaceType = z.infer<typeof Workspace>;

// Export the schemas
export const schemas = {
	User,
	Workspace
};

type Schemas = typeof schemas;

export type { UserType, WorkspaceType, Schemas };
