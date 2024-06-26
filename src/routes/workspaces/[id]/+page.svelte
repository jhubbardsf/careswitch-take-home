<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="  w-[380px]">
		<Card.Header>
			<Card.Title class="text-center">User Information</Card.Title>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div>
				<Card.Title>Name</Card.Title>
				<Card.Description>{data.user?.name}</Card.Description>
			</div>
			<div>
				<Card.Title>Description</Card.Title>
				<Card.Description>{data.user?.description}</Card.Description>
			</div>
			{#if data.user?.users}
				<Card.Title>Users</Card.Title>
				{#each data.user.users as user}
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
