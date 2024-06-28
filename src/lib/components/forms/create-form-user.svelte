<script lang="ts">
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { schemas, type UserType, type WorkspaceType } from '$lib/schema';
	import SuperDebug, { type SuperForm, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '../ui/checkbox';
	import { z } from 'zod';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { AnyZodObject } from 'zod';
	import WorkspacesFilter from './workspacesFilter.svelte';

	type TableType = 'user' | 'workspace';
	type PageType = 'create' | 'edit';
	type FormType = UserType | WorkspaceType;
	type Data = {
		data: SuperValidated<FormType>;
		type: PageType;
		workspaces?: WorkspaceType[];
		tableType: TableType;
	};
	// Modify the isUser function to work with FormType
	const isUser = (form: FormType): form is UserType => {
		return 'email' in form;
	};

	// Define a type for the superForm return type
	type MySuperForm = SuperForm<FormType, AnyZodObject>;

	let { data, type, workspaces, tableType = 'user' }: Data = $props();

	let form: MySuperForm = superForm(data, {
		validators: zodClient(tableType === 'user' ? schemas.User : schemas.Workspace),
		dataType: 'json',
		invalidateAll: 'force',
		onResult: async (resultt) => {
			const { result } = resultt;
			console.log('create form result', { result, resultt });
			if (result.status === 200) {
				const path = isUser(result.data.form.data) ? 'users' : 'workspaces';
				if (type === 'create') {
					await goto(`/${path}/${result.data.form.message.id}`);
				} else if (type === 'edit') {
					await goto(`/${path}/${result.data.form.data.id}`);
				}
			}
		}
	});

	const { form: formData, enhance, errors, message, submit } = form;

	type FormFieldProps<T extends FormType> = {
		form: MySuperForm;
		fieldName: keyof T;
	};

	function isValidFormField(name: string): name is keyof FormType {
		return name in $formData;
	}

	// Use the modified isUser function
	function addItem(workspace: WorkspaceType) {
		console.log('addItem', workspace);
		if (isUser($formData)) {
			console.log('isUser', $formData);
			$formData.workspaces = $formData.workspaces
				? [...$formData.workspaces, workspace]
				: [workspace];
		}
	}

	function removeItem(workspace: WorkspaceType) {
		console.log('removeItem', workspace);
		if (isUser($formData)) {
			console.log('isUser', $formData);
			$formData.workspaces = $formData.workspaces?.filter((i) => i.id !== workspace.id);
		}
	}
</script>

<div class="stickied-debug">
	{#if isUser($formData)}
		<SuperDebug data={{ $formData }} display={dev} collapsible />
	{/if}
</div>

{#snippet FormField({
	form,
	fieldName
}: {
	form: MySuperForm;
	fieldName: keyof UserType | keyof WorkspaceType;
})}
	{#if isValidFormField(fieldName)}
		<Form.Field {form} name={fieldName}>
			<Form.Control let:attrs>
				<Form.Label>{fieldName}</Form.Label>
				<Input {...attrs} bind:value={$formData[fieldName]} />
			</Form.Control>
			<Form.Description>This is your public display {fieldName}.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{/if}
{/snippet}

<form method="POST" use:enhance>
	{@render FormField({ form, fieldName: 'name' })}
	{@render FormField({ form, fieldName: 'email' })}
	{@render FormField({ form, fieldName: 'description' })}

	{#if isUser($formData)}
		<Form.Field {form} name="workspaces">
			<Form.Control let:attrs>
				<Form.Label>Workspaces</Form.Label>
				<div class="space-y-2">
					{#if workspaces}
						<WorkspacesFilter
							{workspaces}
							selectedWorkspaces={$formData.workspaces}
							{addItem}
							{removeItem}
						/>
					{/if}
					<!-- {#if workspaces}
					{#each workspaces as workspace}
						{#if isUser($formData)}
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
						{/if}
					{/each}
				{/if}
				<Form.FieldErrors /> -->
				</div>
			</Form.Control>
			<Form.Description>These are your workspaces.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{/if}
	<div class="flex items-center justify-between space-y-2">
		<Form.Button>Submit</Form.Button>

		<AlertDialog.Root>
			<AlertDialog.Trigger asChild let:builder>
				<Button builders={[builder]} variant="destructive" name="delete">Delete</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action
						name="delete"
						on:click={(e) => {
							$formData.delete = true;
							submit();
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
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
