<script lang="ts">
	import { Link } from '$lib/components/ui/link';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
</script>

<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
	<div class="space-y-6 rounded-md border p-4">
		<p>
			Welcome to the Careswitch take-home assignment! If you followed the quickstart guide in the
			README, you should see the table below populated with the seeded users:
		</p>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>View</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.users as user (user.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell
							><Link href={`/users/view/${user.id}`} class="text-red-700">View</Link></Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
