<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table-workspace.svelte';

	const { data } = $props();
	const { workspaces } = data;

	$effect(() => {
		console.log({ workspaces });
	});
</script>

<div class="flex h-full flex-col space-y-4 p-8">
	<div>
		<h2 class="text-2xl font-bold tracking-tight">Workspaces List</h2>
	</div>
	<div class="flex-1 overflow-hidden">
		<DataTable data={workspaces} />
	</div>
</div>
