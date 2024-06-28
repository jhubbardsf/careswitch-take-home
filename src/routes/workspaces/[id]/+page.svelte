<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let { data } = $props();
	console.log('Workspaces read data: ', JSON.stringify(data, null, 2));
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="  w-[380px]">
		<Card.Header>
			<Card.Title class="text-center">Workspace Information</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div>
				<Card.Title>Name</Card.Title>
				<Card.Description>{data.workspace?.name}</Card.Description>
			</div>
			<div>
				<Card.Title>Description</Card.Title>
				<Card.Description>{data.workspace?.description}</Card.Description>
			</div>
			{#if data.workspace?.users}
				<Card.Title>Users</Card.Title>
				{#each data.workspace.users as user}
					<Card.Description>
						{user.name}
					</Card.Description>
				{/each}
			{/if}
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" href={`/workspaces/${$page.params.id}/edit`}>Edit</Button>
		</Card.Footer>
	</Card.Root>
</div>
