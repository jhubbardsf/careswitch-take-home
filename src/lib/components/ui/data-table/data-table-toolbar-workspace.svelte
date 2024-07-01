<script lang="ts">
	import type { TableViewModel } from 'svelte-headless-table';
	import Cross2 from 'svelte-radix/Cross2.svelte';
	import type { Writable } from 'svelte/store';
	import type { Task } from './schemas.js';
	import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { UserType, WorkspaceType } from '$lib/schema.js';

	const { tableModel, data }: { tableModel: TableViewModel<Task>; data: Task[] } = $props();

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	let showReset = $derived(
		Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0)
	);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<div class="flex space-x-2">
			<Input
				placeholder="Filter users..."
				class="h-8 w-[150px] lg:w-[250px]"
				type="search"
				bind:value={$filterValue}
			/>

			<Button href="/workspaces/create" variant="outline" size="sm">Create</Button>
		</div>

		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.status = [];
					$filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<Cross2 class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
