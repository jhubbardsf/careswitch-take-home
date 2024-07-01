import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, message, fail, setError } from 'sveltekit-superforms';
import { schemas } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params: { id }, parent }) => {
	const user = await prisma.user.findFirst({
		where: { id: Number(id) },
		include: { workspaces: true }
	});
	const form = await superValidate(user, zod(schemas.User));

	return {
		form,
		workspaces: await prisma.workspace.findMany()
	};
};

export const actions: Actions = {
	default: async (event) => {
		let { cookies } = event;
		const formData = await event.request.formData();

		let form = await superValidate(formData, zod(schemas.User));

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
			let user = await prisma.user.findFirst({
				where: { id: Number(form.data.id) },
				include: { workspaces: true }
			});
			if (!user) error(404, 'User not found.');

			// Check for delete
			if (form.data.delete) {
				console.log('deleting user');
				await prisma.user.delete({
					where: { id: Number(form.data.id) }
				});
			} else {
				console.log('no delete');

				console.log({
					workspaces: form.data.workspaces?.map((workspace) => ({ id: workspace.id }))
				});

				let updateUser = await prisma.user.update({
					where: { id: Number(form.data.id) },
					data: {
						name: form.data.name,
						email: form.data.email,
						workspaces: {
							set: form.data.workspaces?.map((workspace) => ({ id: workspace.id }))
						}
					}
				});

				return message(form, 'User updated!');
			}
		} catch (error) {
			console.error({ error, 'error.message': (error as any).message });
			return setError(form, 'email', 'E-mail already exists.');
		}

		redirect(303, '/users');
	}
};
