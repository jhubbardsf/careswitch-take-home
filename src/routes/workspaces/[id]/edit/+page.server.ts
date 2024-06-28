import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, message, fail, setError } from 'sveltekit-superforms';
import { schemas } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params: { id }, parent }) => {
	const workspace = await prisma.workspace.findFirst({
		where: { id: Number(id) },
		include: { users: true }
	});

	return {
		form: await superValidate(workspace, zod(schemas.Workspace)),
		users: await prisma.user.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		let { cookies } = event;
		const formData = await event.request.formData();

		let form = await superValidate(formData, zod(schemas.Workspace));

		// let formData = await event.request.formData();
		console.log({ form, formData: JSON.stringify(formData, null, 2) });
		if (!form.valid) {
			console.log('Form is invalid', { form });
			return fail(400, {
				form
			});
		}

		try {
			console.log('Attempting to save user', { form });
			let user = await prisma.workspace.findFirst({
				where: { id: Number(form.data.id) },
				include: { users: true }
			});
			if (!user) error(404, 'User not found.');

			// Check for delete
			if (form.data.delete) {
				console.log('deleting user');
				await prisma.workspace.delete({
					where: { id: Number(form.data.id) }
				});
			} else {
				console.log('no delete');

				console.log({
					workspaces: form.data.users?.map((user) => ({ id: user.id }))
				});

				let updateUser = await prisma.workspace.update({
					where: { id: Number(form.data.id) },
					data: {
						name: form.data.name,
						description: form.data.description,
						users: {
							set: form.data.users?.map((user) => ({ id: user.id }))
						}
					}
				});

				return message(form, 'User updated!');
			}
		} catch (error) {
			console.error({ error, 'error.message': (error as any).message });
			return setError(form, 'name', 'Name already exists.');
		}

		redirect(303, '/workspaces');
	}
};
