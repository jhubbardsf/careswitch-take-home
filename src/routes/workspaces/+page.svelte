<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import UserNav from '$lib/components/ui/data-table/user-nav.svelte';
	import data from '$lib/components/ui/data-table/tasks.json';
</script>

<div class="flex h-full flex-1 flex-col space-y-8 p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	<DataTable {data} />
</div>
