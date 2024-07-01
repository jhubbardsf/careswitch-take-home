<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLAnchorAttributes;

	let className: string | null | undefined = '';
	export { className as class };
	export let preload = true;
</script>

<a
	data-sveltekit-preload-data={preload ? 'hover' : false}
	href={$$restProps.href ?? '#'}
	class={cn(
		'rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
		className
	)}
>
	<slot /></a
>
