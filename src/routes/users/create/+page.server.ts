import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schemas } from '$lib/schema.js';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(schemas.User)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('Hit Action');
		const form = await superValidate(request, zod(schemas.User));
		console.log({ form });

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
