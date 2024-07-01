import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, message, fail, setError, actionResult } from 'sveltekit-superforms';
import { schemas, type WorkspaceType } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/db.js';
import type { Workspace } from '@prisma/client';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schemas.Workspace)),
		workspaces: await prisma.workspace.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schemas.Workspace));
		if (!form.valid) {
			console.log('Form is invalid', { form });
			return fail(400, {
				form
			});
		}

		let workspace: Workspace;
		try {
			console.log('Attempting to save user', { form });

			workspace = await prisma.workspace.create({
				data: {
					name: form.data.name,
					description: form.data.description,
					avatar: `https://robohash.org/${crypto.randomUUID()}.png`
				}
			});

			console.log('Inside create', { user: workspace });

			// actionResult('redirect', `/users/view/${user.id}`, 303);
		} catch (error) {
			console.error({ error, 'error.message': (error as any).message });
			return setError(form, 'name', 'Name already exists.');
		}
		return message(form, workspace);
	}
};
