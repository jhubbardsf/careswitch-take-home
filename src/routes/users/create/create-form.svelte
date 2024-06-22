<script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { schemas } from '$lib/schema';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { z } from 'zod';

	export let data: SuperValidated<z.infer<typeof schemas.User>>;

	const form = superForm(data, {
		validators: zodClient(schemas.User),
		dataType: 'json'
	});

	const { form: formData, enhance, errors, message, allErrors } = form;

	$: console.log({ $errors });
	$: console.log({ $allErrors });
	$: console.log({ $errors });
	$: console.log({ $formData });
	$: console.log({ $message });
	$: console.log({ '$page.error': $page.error });
	$: console.log({ $page });
</script>

{#if $message}
	<p>{$message}</p>
{/if}

{#if $allErrors.length}
	<ul>
		{#each $allErrors as error}
			<li>
				<b>{error.path}:</b>
				{error.messages.join('. ')}
			</li>
		{/each}
	</ul>
{/if}

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
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
	<Form.Button>Submit</Form.Button>
</form>
