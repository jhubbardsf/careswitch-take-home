<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/ui/sticky-navbar/navbar.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="flex h-screen flex-col items-center justify-center">
	<Navbar />
	{@render children()}
</div>
