<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import UserNav from '$lib/components/ui/data-table/user-nav.svelte';
	import type { UserType } from '$lib/schema';

	const { data } = $props();
	const { users } = data;

	$effect(() => {
		console.log({ users });
	});
</script>

<div class="flex min-h-screen flex-1 flex-col space-y-8 p-10">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">User List</h2>
		</div>
	</div>
	<DataTable data={users} />
	<!-- Add more content here if needed to force scrolling -->
</div>
