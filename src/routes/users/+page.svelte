<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import UserNav from '$lib/components/ui/data-table/user-nav.svelte';
	import type { UserType } from '$lib/schema';
	// import data from '$lib/components/ui/data-table/tasks.json';

	const data = [
		{
			id: 'TASK-8782',
			title: "You can't compress the program without quantifying the open-source SSD pixel!",
			status: 'in progress',
			label: 'documentation',
			priority: 'medium'
		}
	];

	const data2: UserType[] = [
		{
			id: 1,
			name: 'Alice',
			email: 'alice@email.com',
			avatar: 'https://api.multiavatar.com/456.svg',
			createdAt: new Date(),
			updatedAt: new Date(),
			workspaces: []
		},
		{
			id: 2,
			name: 'Bob',
			email: 'bob@email.com',
			avatar: 'https://api.multiavatar.com/123.svg',
			createdAt: new Date(),
			updatedAt: new Date(),
			workspaces: []
		}
	];

	// const { data } = $props();
</script>

<div class="flex h-full flex-1 flex-col space-y-8 p-8">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">User List</h2>
		</div>
	</div>
	<DataTable data={data2} />
</div>
