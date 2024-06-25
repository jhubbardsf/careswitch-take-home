<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import {
		Command,
		CommandInput,
		CommandEmpty,
		CommandGroup,
		CommandItem
	} from '$lib/components/ui/command';
	import { Check, ChevronsUpDown, X } from 'lucide-svelte';
	import { debounce } from 'lodash-es';
	import { mount, onMount } from 'svelte';

	type FetchWorkspaces = (
		search: string,
		page: number
	) => Promise<{ items: { id: string; name: string }[]; hasMore: boolean }>;
	type SelectedWorkspaces = string[];
	type OnChange = (newSelectedWorkspaces: SelectedWorkspaces) => void;
	type Data = {
		fetchWorkspaces: FetchWorkspaces;
		selectedWorkspaces: SelectedWorkspaces;
		onchange: OnChange;
	};

	const { fetchWorkspaces, selectedWorkspaces, onchange }: Data = $props();

	let searchTerm = $state('');
	let workspaces: { id: string; name: string }[] = $state([]);
	let loading = $state(false);
	let page = $state(1);
	let hasMore = $state(true);
	let open = $state(false);

	const debouncedSearch = debounce(async () => {
		page = 1;
		await loadWorkspaces(true);
	}, 300);

	$effect(() => {
		if (searchTerm) {
			debouncedSearch();
		}
	});

	async function loadWorkspaces(reset = false) {
		if (reset) {
			workspaces = [];
			hasMore = true;
		}

		if (!hasMore || loading) return;

		loading = true;
		try {
			const result = await fetchWorkspaces(searchTerm, page);
			workspaces = reset ? result.items : [...workspaces, ...result.items];
			hasMore = result.hasMore;
			page++;
		} catch (error) {
			console.error('Error fetching workspaces:', error);
		} finally {
			loading = false;
		}
	}

	function toggleWorkspace(workspaceId: string) {
		let newSelectedWorkspaces: SelectedWorkspaces;
		if (selectedWorkspaces.includes(workspaceId)) {
			newSelectedWorkspaces = selectedWorkspaces.filter((id) => id !== workspaceId);
		} else {
			newSelectedWorkspaces = [...selectedWorkspaces, workspaceId];
		}
		console.log('toggleWorkspace', { workspaceId, newSelectedWorkspaces });
		onchange(newSelectedWorkspaces);
	}

	function removeWorkspace(workspaceId: string) {
		const newSelectedWorkspaces = selectedWorkspaces.filter((id) => id !== workspaceId);
		console.log('removeWorkspace', { workspaceId, newSelectedWorkspaces });
		onchange(newSelectedWorkspaces);
	}

	onMount(() => {
		loadWorkspaces();
	});
</script>

<div class="space-y-2">
	<Popover bind:open>
		<PopoverTrigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between"
			>
				Select workspaces...
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-[400px] p-0">
			<Command>
				<CommandInput placeholder="Search workspaces..." bind:value={searchTerm} />
				<CommandEmpty>No workspace found.</CommandEmpty>
				<CommandGroup>
					{#each workspaces as workspace (workspace.id)}
						<CommandItem value={workspace.id} on:click={() => toggleWorkspace(workspace.id)}>
							<Check
								class={selectedWorkspaces.includes(workspace.id) ? 'opacity-100' : 'opacity-0'}
							/>
							{workspace.name}
						</CommandItem>
					{/each}
					{#if loading}
						<CommandItem disabled>Loading...</CommandItem>
					{/if}
					{#if hasMore && !loading}
						<CommandItem onclick={() => loadWorkspaces()}>Load more...</CommandItem>
					{/if}
				</CommandGroup>
			</Command>
		</PopoverContent>
	</Popover>

	<div class="flex flex-wrap gap-2">
		{#each selectedWorkspaces as workspaceId}
			{#if workspaces.find((w) => w.id === workspaceId)}
				{@const workspace = workspaces.find((w) => w.id === workspaceId)}
				<Badge variant="secondary">
					{workspace!.name}
					<Button
						variant="ghost"
						size="icon"
						class="ml-2 h-4 w-4 hover:bg-transparent"
						onclick={() => removeWorkspace(workspaceId)}
					>
						<X class="h-3 w-3" />
					</Button>
				</Badge>
			{:else}
				<Badge variant="secondary">
					{workspaceId}
					<Button
						variant="ghost"
						size="icon"
						class="ml-2 h-4 w-4 hover:bg-transparent"
						onclick={() => removeWorkspace(workspaceId)}
					>
						<X class="h-3 w-3" />
					</Button>
				</Badge>
			{/if}
		{/each}
	</div>
</div>
