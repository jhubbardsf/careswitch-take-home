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
				<Card.Title>Email</Card.Title>
				<Card.Description>{data.user?.email}</Card.Description>
			</div>
			{#if data.user?.workspaces}
				<Card.Title>Workspaces</Card.Title>
				{#each data.user.workspaces as workspace}
					<Card.Description>
						{workspace.name}
					</Card.Description>
				{/each}
			{/if}
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" href={`/users/edit/${$page.params.id}`}>Edit</Button>
		</Card.Footer>
	</Card.Root>
</div>
