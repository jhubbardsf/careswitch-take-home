<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { schemas } from '$lib/schema';
	import type { User } from '@prisma/client';
	import SuperDebug, { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { z } from 'zod';

	type PageType = 'create' | 'edit';
	type Data = { data: SuperValidated<z.infer<typeof schemas.User>>; type: PageType };
	let { data, type }: Data = $props();

	let form = superForm(data, {
		validators: zodClient(schemas.User),
		dataType: 'json',
		invalidateAll: 'force',
		onResult: async ({ result }) => {
			console.log({ result });

			if (result.status === 200) {
				if (type === 'create') {
					// @ts-expect-error There seems to be an issue with the result type
					await goto(`/users/view/${result.data.form.message.id}`);
				} else if (type === 'edit') {
					// @ts-expect-error There seems to be an issue with the result type
					await goto(`/users/view/${result.data.form.data.id}`);
				}
			}
		}
	});

	const { form: formData, enhance, errors, message } = form;
</script>

<div class="stickied-debug">
	<SuperDebug data={{ $formData, $errors }} display={dev} collapsible />
</div>

{#if $message}
	<p>{$message}</p>
{/if}

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>This is your public display email.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex items-center justify-center">
		<Form.Button>Submit</Form.Button>
	</div>
</form>

<style>
	.stickied-debug {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000; /* Ensure it is on top of other elements */
		background-color: white; /* Optional: to avoid overlap issues */
		padding: 10px; /* Optional: for some padding */
		border: 1px solid #ccc; /* Optional: to give it a border */
	}
</style>
