<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { flashMessage } from '$lib/flashMessage.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	console.log('Test');
</script>

<ModeWatcher />

{#if flashMessage.toastText}
	<div class="z-50">
		{@html flashMessage.toastText}
	</div>
{/if}

<div class="flex h-screen w-full flex-col overflow-hidden">
	<Header />
	<main class="flex-1 overflow-hidden bg-muted/40">
		{@render children()}
	</main>
</div>
