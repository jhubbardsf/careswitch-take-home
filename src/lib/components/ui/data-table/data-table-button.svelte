<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	export let href: string;
	export let text: string;
</script>

<Button {href}>
	{text}
</Button>
