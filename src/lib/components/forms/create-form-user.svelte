<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { schemas, type WorkspaceType } from '$lib/schema';
	import type { User } from '@prisma/client';
	import SuperDebug, { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '../ui/checkbox';
	import { z } from 'zod';

	type PageType = 'create' | 'edit';
	type Data = {
		data: SuperValidated<z.infer<typeof schemas.User>>;
		type: PageType;
		workspaces: WorkspaceType[];
	};

	let { data, type, workspaces }: Data = $props();

	let form = superForm(data, {
		validators: zodClient(schemas.User),
		dataType: 'json',
		invalidateAll: 'force',
		onResult: async ({ result }) => {
			console.log({ result });
			if (result.status === 200) {
				if (type === 'create') {
					await goto(`/users/view/${result.form.message.id}`);
				} else if (type === 'edit') {
					await goto(`/users/view/${result.data.form.data.id}`);
				}
			}
		}
	});

	const { form: formData, enhance, errors, message } = form;

	function addItem(id: WorkspaceType) {
		$formData.workspaces = $formData.workspaces ? [...$formData.workspaces, id] : [id];
	}

	function removeItem(id: WorkspaceType) {
		$formData.workspaces = $formData.workspaces?.filter((i) => i.id !== id.id);
	}
</script>

<div class="stickied-debug">
	<SuperDebug data={{ $formData, $errors }} display={dev} collapsible />
</div>

{#if message}
	<p>{message}</p>
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
	<Form.Field {form} name="workspaces">
		<Form.Control let:attrs>
			<Form.Label>Workspaces</Form.Label>
			<div class="space-y-2">
				{#each workspaces as workspace}
					{@const checked = $formData?.workspaces?.some((w) => w.id === workspace.id)}
					<div class="flex flex-row items-start space-x-3">
						<Form.Control let:attrs>
							<Checkbox
								{...attrs}
								checked={Boolean(checked)}
								onCheckedChange={(v) => {
									if (v) {
										addItem(workspace);
									} else {
										removeItem(workspace);
									}
								}}
							/>
							<Form.Label class="font-normal">
								{workspace.name}
							</Form.Label>
							<input
								class="hidden"
								type="checkbox"
								name={attrs.name}
								value={workspace.id}
								{checked}
							/>
						</Form.Control>
					</div>
				{/each}
				<Form.FieldErrors />
			</div>
		</Form.Control>
		<Form.Description>These are your workspaces.</Form.Description>
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
