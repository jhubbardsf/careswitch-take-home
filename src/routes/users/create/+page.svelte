<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import CreateForm from '$lib/components/forms/create-form-user.svelte';

	const { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="w-[380px] p-4">
		<CreateForm data={data.form} workspaces={data.workspaces} type="create" />
	</Card.Root>
</div>
