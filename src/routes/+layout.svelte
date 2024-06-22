<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/ui/sticky-navbar/navbar.svelte';
	import { flashMessage } from '$lib/flashMessage.svelte';

	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	let { children } = $props();

	flashMessage.setFlash('Test', 5000);
	$inspect(flashMessage.toastText).with(console.log);
	console.log(flashMessage.toastText);
</script>

<ModeWatcher />

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="h-6 w-6" />
				<span class="sr-only">CareSwitch Demo</span>
			</a>
			<a
				href="/"
				class={cn('transition-colorshover:text-foreground text-muted-foreground', {
					'text-foreground': $page.url.pathname === '/'
				})}
			>
				Dashboard
			</a><a
				href="/users"
				class={cn('text-muted-foreground transition-colors hover:text-foreground', {
					'text-foreground': $page.url.pathname.toString().includes('users')
				})}
			>
				Users
			</a>
			<a
				href="/workspaces"
				class={cn('text-muted-foreground transition-colors hover:text-foreground', {
					'text-foreground': $page.url.pathname.toString().includes('workspaces')
				})}
			>
				Workspaces
			</a>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="hover:text-foreground"> Settings </a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</header>
	<main
		class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
	>
		{@render children()}
	</main>
</div>

<!-- <div class="flex h-screen flex-col items-center justify-center">
	<Navbar />
	{#if $flash}
		{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
		<div style:background-color={bg} class="flash">{$flash.message}</div>
	{/if}
	{#if flashMessage.toastText}
		{@html flashMessage.toastText}
	{/if}
	{@render children()}
</div> -->
