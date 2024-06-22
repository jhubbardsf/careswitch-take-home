import type { Actions, PageServerLoad } from './$types.js';
import { prisma } from '$lib/server/db';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schemas } from '$lib/schema.js';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schemas.User));
	console.log('load form', { form });
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('Hit Action');
		const form = await superValidate(request, zod(schemas.User));
		console.log({ form });

		if (!form.valid) return fail(400, { form });

		// Use the imported prisma object to create a user with the form data
		const user = await prisma.user.create({
			data: { name: form.data.name, email: form.data.email }
		});

		console.log('Creating user: ', { user });

		return message(form, 'Form posted successfully!');
	}
};
