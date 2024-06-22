<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import SettingsForm from './create-form.svelte';

	const { data } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="w-[380px] p-4">
		<SettingsForm data={data.form} />
	</Card.Root>
</div>
