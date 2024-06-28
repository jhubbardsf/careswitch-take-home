<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { flashMessage } from '$lib/flashMessage.svelte';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<ModeWatcher />

{#if flashMessage.toastText}
	<div class="z-50">
		{@html flashMessage.toastText}
	</div>
{/if}

<div class="flex h-screen w-full flex-col overflow-hidden bg-green-600">
	<Header />
	<!-- bg-muted/40 -->
	<main class="flex-1 overflow-hidden bg-red-500">
		{@render children()}
	</main>
</div>
