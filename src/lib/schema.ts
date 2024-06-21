import { z } from 'zod';

// Define the WorkspaceToUser schema
const WorkspaceToUser = z
	.object({
		userId: z.string().cuid(),
		workspaceId: z.number().int(),
		assignedAt: z.date().default(() => new Date()),
		assignedBy: z.string()
	})
	.strict();

// Define the User schema
const User = z.object({
	id: z.string().cuid(),
	name: z.string(),
	email: z.string().email(),
	workspaces: z.array(WorkspaceToUser)
});

// Define the Workspace schema
const Workspace = z.object({
	id: z.number().int().positive().nonnegative(),
	name: z.string(),
	users: z.array(WorkspaceToUser)
});

// Derive and export the types from the schemas
type UserType = z.infer<typeof User>;
type WorkspaceType = z.infer<typeof Workspace>;
type WorkspaceToUserType = z.infer<typeof WorkspaceToUser>;

// Export the schemas
export const schemas = {
	User,
	Workspace,
	WorkspaceToUser
};

type Schemas = typeof schemas;

export type { UserType, WorkspaceType, WorkspaceToUserType, Schemas };
