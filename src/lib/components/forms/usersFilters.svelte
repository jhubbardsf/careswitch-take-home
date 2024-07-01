<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import type { WorkspaceType } from '$lib/schema';

	let searchTerm: string = $state('');

	let {
		users,
		removeItem,
		addItem,
		selectedUsers = $bindable()
	}: {
		users: WorkspaceType[];
		removeItem: any;
		addItem: any;
		selectedUsers: WorkspaceType[];
	} = $props();

	const filteredUsers = $derived(
		users?.filter((workspace: WorkspaceType) =>
			workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	function handleUserSelect(workspace: WorkspaceType) {
		console.log('handleUserSelect');
		if (selectedUsers.some((u) => u.id === workspace.id)) {
			console.log('removing user');
			removeItem(workspace);
			selectedUsers = selectedUsers?.filter((u) => u.id !== workspace.id);
		} else {
			console.log('adding user');
			addItem(workspace);
			selectedUsers = [...selectedUsers, workspace];
		}
	}

	$effect(() => {
		console.log('jsh users: ', { filteredUsers });
	});
	$inspect({ filteredWorkspaces: filteredUsers });
</script>

{#snippet CheckIcon(props)}
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20 6 9 17l-5-5" />
	</svg>
{/snippet}

{#snippet SearchIcon(props)}
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
{/snippet}

<Card.Root class="max-w-md">
	<Card.Content class="space-y-4 pt-4">
		<div class="relative">
			<Input type="text" placeholder="Search users..." bind:value={searchTerm} class="pr-8" />
			<div class="absolute inset-y-0 right-2 flex items-center">
				{@render SearchIcon({ class: 'h-5 w-5 text-muted-foreground' })}
			</div>
		</div>
		<div class="overflow-hidden rounded-lg border">
			<ul class="max-h-40 divide-y overflow-y-auto">
				{#each filteredUsers as user (user.id)}
					<li
						class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-muted {selectedUsers.some(
							(u) => u.id === user.id
						)
							? 'bg-primary text-primary-foreground'
							: ''}"
						onclick={() => handleUserSelect(user)}
					>
						<div class="flex items-center gap-3">
							<Avatar.Root>
								<Avatar.Image src={user.avatar} />
								<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
							<span>{user.name}</span>
						</div>
						{#if selectedUsers.some((u) => u.id === user.id)}
							{@render CheckIcon({ class: 'h-5 w-5' })}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		{#if selectedUsers.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each selectedUsers as workspace}
					<Badge variant="outline">
						{workspace.name}
					</Badge>
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
