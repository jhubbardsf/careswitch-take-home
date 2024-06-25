import type { PageServerLoad, Actions } from './$types.js';
import { superValidate, message, fail, setError } from 'sveltekit-superforms';
import { schemas } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/db.js';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params: { id } }) => {
	const user = await prisma.user.findFirst({
		where: { id: Number(id) },
		include: { workspaces: true }
	});
	const workspaces = await prisma.workspace.findMany();
	const form = await superValidate(user, zod(schemas.User));

	return {
		form,
		workspaces
	};
};

export const actions: Actions = {
	default: async (event) => {
		let { cookies } = event;
		let form = await superValidate(event, zod(schemas.User));
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

			console.log({ workspaces: form.data.workspaces?.map((workspace) => ({ id: workspace.id })) });

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

			// redirect('/', { type: 'success', message: "That's the entrepreneur spirit!" }, cookies);			// redirect(200, `/users/view/${updateUser.id}`);
		} catch (error) {
			console.error({ error, 'error.message': (error as any).message });
			return setError(form, 'email', 'E-mail already exists.');
		}
	}
};
