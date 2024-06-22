<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/ui/sticky-navbar/navbar.svelte';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	let { children } = $props();
	const flash = getFlash(page);
</script>

<ModeWatcher />
{#if $flash}
	{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
	<div style:background-color={bg} class="flash">{$flash.message}</div>
{/if}
<div class="flex h-screen flex-col items-center justify-center">
	<Navbar />
	{@render children()}
</div>
