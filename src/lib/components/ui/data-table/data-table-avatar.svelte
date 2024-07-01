<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	export let src: string;
	export let alt: string;
</script>

<Avatar.Root>
	<Avatar.Image {src} {alt} />
	<Avatar.Fallback>CS</Avatar.Fallback>
</Avatar.Root>
