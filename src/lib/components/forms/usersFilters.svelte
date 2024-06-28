<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { SearchIcon } from 'lucide-svelte';
	import type { WorkspaceType } from '$lib/schema';

	let searchTerm: string = $state('');
	// let selectedWorkspaces: WorkspaceType[] = $state([]);

	let {
		workspaces,
		removeItem,
		addItem,
		selectedWorkspaces = $bindable()
	}: {
		workspaces: WorkspaceType[];
		removeItem: any;
		addItem: any;
		selectedWorkspaces: WorkspaceType[];
	} = $props();

	const filteredWorkspaces = $derived(
		workspaces?.filter((workspace: WorkspaceType) =>
			workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	function handleWorkspaceSelect(workspace: WorkspaceType) {
		console.log('handleUserSelect');
		if (selectedWorkspaces.some((u) => u.id === workspace.id)) {
			console.log('removing workspace');
			removeItem(workspace);
			selectedWorkspaces = selectedWorkspaces?.filter((u) => u.id !== workspace.id);
		} else {
			console.log('adding workspace');
			addItem(workspace);
			selectedWorkspaces = [...selectedWorkspaces, workspace];
		}
	}

	$inspect({ filteredWorkspaces });
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
				{#each filteredWorkspaces as user (user.id)}
					<li
						class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-muted {selectedWorkspaces.some(
							(u) => u.id === user.id
						)
							? 'bg-primary text-primary-foreground'
							: ''}"
						onclick={() => handleWorkspaceSelect(user)}
					>
						<div class="flex items-center gap-3">
							<Avatar.Root>
								<Avatar.Image src={user.avatar} />
								<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
							<span>{user.name}</span>
						</div>
						{#if selectedWorkspaces.some((u) => u.id === user.id)}
							{@render CheckIcon({ class: 'h-5 w-5' })}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		{#if selectedWorkspaces.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each selectedWorkspaces as workspace}
					<Badge variant="outline">
						{workspace.name}
					</Badge>
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
