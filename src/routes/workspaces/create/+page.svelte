<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types.js';
	import CreateForm from './create-form.svelte';

	export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center">
	<Card.Root class="w-[380px] p-4">
		<CreateForm data={data.form} />
	</Card.Root>
</div>
