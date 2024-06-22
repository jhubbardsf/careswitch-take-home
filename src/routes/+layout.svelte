<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/ui/sticky-navbar/navbar.svelte';
	import { getFlash, initFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { flashMessage } from '$lib/flashMessage.svelte';

	let { children } = $props();
	const flash = getFlash(page);

	flashMessage.setFlash('Test', 5000);
	$inspect(flashMessage.toastText).with(console.log);
	console.log(flashMessage.toastText);
</script>

<ModeWatcher />

<div class="flex h-screen flex-col items-center justify-center">
	<Navbar />
	{#if $flash}
		{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
		<div style:background-color={bg} class="flash">{$flash.message}</div>
	{/if}
	{#if flashMessage.toastText}
		{@html flashMessage.toastText}
	{/if}
	{@render children()}
</div>
