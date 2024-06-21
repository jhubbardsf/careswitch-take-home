import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schemas } from '$lib/schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(schemas.User))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log(1);
		const form = await superValidate(event, zod(schemas.User));
		console.log(22);
		if (!form.valid) {
			console.log(3);
			return fail(400, {
				form
			});
		}
		console.log(4);
		return {
			form
		};
	}
};
