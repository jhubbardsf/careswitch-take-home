<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table-workspace.svelte';
	import UserNav from '$lib/components/ui/data-table/user-nav.svelte';
	import type { UserType } from '$lib/schema';
	// import data from '$lib/components/ui/data-table/tasks.json';

	const { data } = $props();
	const { workspaces } = data;

	$effect(() => {
		console.log({ workspaces });
	});
</script>

<div class="flex h-full flex-1 flex-col space-y-8 p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Workspaces List</h2>
		</div>
	</div>
	<DataTable data={workspaces} />
</div>
