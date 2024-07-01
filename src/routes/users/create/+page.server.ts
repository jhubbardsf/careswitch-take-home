import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, message, fail, setError, actionResult } from 'sveltekit-superforms';
import { schemas } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/db.js';
import type { User } from '@prisma/client';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schemas.User)),
		workspaces: await prisma.workspace.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schemas.User));
		console.log('Inside default about to valiate');
		if (!form.valid) {
			console.log('Form is invalid', { form });
			return fail(400, {
				form
			});
		}
		console.log('Form is valid', { form });

		let user: User;
		try {
			console.log('Attempting to save user', { form });

			user = await prisma.user.create({
				data: {
					name: form.data.name,
					email: form.data.email,
					avatar: `https://api.multiavatar.com/${crypto.randomUUID()}.svg`,
					workspaces: {
						connect: form.data.workspaces
					}
				}
			});

			console.log('Inside create', { user });

			// actionResult('redirect', `/users/view/${user.id}`, 303);
		} catch (error) {
			console.error({ error, 'error.message': (error as any).message });
			return setError(form, 'email', 'E-mail already exists.');
		}
		return message(form, user);
	}
};
