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
	import UsersFilters from './usersFilters.svelte';
	import { page } from '$app/stores';

	type TableType = 'user' | 'workspace';
	type PageType = 'create' | 'edit';
	type FormType = UserType | WorkspaceType;
	type Data = {
		data: SuperValidated<FormType>;
		type: PageType;
		workspaces?: WorkspaceType[];
		users?: UserType[];
		tableType: TableType;
	};

	// Define a type for the superForm return type
	type MySuperForm = SuperForm<FormType, AnyZodObject>;

	let { data, type, workspaces, users, tableType = 'user' }: Data = $props();

	function isUserForm(form: FormType): form is UserType {
		return 'workspaces' in form;
	}
	let form: MySuperForm = superForm(data, {
		validators: zodClient(tableType === 'user' ? schemas.User : schemas.Workspace),
		dataType: 'json',
		invalidateAll: 'force',
		onResult: async ({ result }) => {
			console.log('create form result', { result });
			if (result.status === 200) {
				const path = isUserForm($formData) ? 'users' : 'workspaces';
				if (type === 'create') {
					await goto(`/${path}/${result.data.form.message.id}`);
				} else if (type === 'edit') {
					await goto(`/${path}/${result.data.form.data.id}`);
				}
			}
		}
	});

	const { form: formData, enhance, errors, message, submit } = form;

	function isValidFormField(name: string): name is keyof FormType {
		return name in $formData;
	}

	// Use the modified isUser function
	function addItem(workspaceOrUser: WorkspaceType | UserType) {
		if (isUserPage) {
			if (isUserForm($formData)) {
				$formData.workspaces = $formData.workspaces
					? [...$formData.workspaces, workspaceOrUser as WorkspaceType]
					: [workspaceOrUser as WorkspaceType];
			}
		} else {
			if ('users' in $formData) {
				$formData.users = $formData.users
					? [...$formData.users, workspaceOrUser as UserType]
					: [workspaceOrUser as UserType];
			}
		}
	}

	function removeItem(workspaceOrUser: WorkspaceType | UserType) {
		console.log('jsh removeItem (remoteItem)', workspaceOrUser);
		if (isUserForm($formData)) {
			// Add/remove workspaces from workspaces
			console.log('jsh isUser (remove)', $formData);
			$formData.workspaces = $formData.workspaces?.filter((i) => i.id !== workspaceOrUser.id);
		} else {
			// Add/remove workspaces from workspaces
			if ('users' in $formData) {
				console.log('jsh isWorkspace (remove)', $formData);
				$formData.users = $formData.users?.filter((i) => i.id !== workspaceOrUser.id);
			}
		}
	}

	$effect(() => {
		console.log('jsh $formData: ', { $formData, workspaces, users });
	});
</script>

<div class="stickied-debug">
	{#if isUserForm($formData)}
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

	{#if isUserForm($formData)}
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
				</div>
			</Form.Control>
			<Form.Description>Select workspaces</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{:else}
		<Form.Field {form} name="users">
			<Form.Control let:attrs>
				<Form.Label>Users</Form.Label>
				<div class="space-y-2">
					{#if users}
						<UsersFilters {users} selectedUsers={$formData.users} {addItem} {removeItem} />
					{/if}
				</div>
			</Form.Control>
			<Form.Description>Select users.</Form.Description>
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
