import { z } from 'zod';

const User = z.object({
	id: z.number().int().positive().nullable(),
	name: z.string().min(1),
	email: z.string().email(),
	avatar: z.string().url().nullish(),
	workspaces: z
		.array(
			z.object({
				id: z.number().int().positive(),
				name: z.string(),
				description: z.string(),
				avatar: z.string().url()
			})
		)
		.default([])
		.optional(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
	delete: z.boolean().default(false)
});

const Workspace = z.object({
	id: z.number().int().positive().nullable(),
	name: z.string().min(1),
	users: z
		.array(
			z.object({
				id: z.number().int().positive().nullable(),
				name: z.string(),
				email: z.string().email(),
				avatar: z.string().url()
			})
		)
		.default([])
		.nullable(),
	description: z.string().min(1),
	avatar: z.string().url().nullish(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
	delete: z.boolean().default(false)
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
