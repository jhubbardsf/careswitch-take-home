<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	import { Package2 } from 'lucide-svelte';
</script>

<header
	class="sticky top-0 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6"
>
	<nav class=" flex gap-6 text-lg font-medium md:items-center md:gap-5 md:text-sm lg:gap-6">
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
</header>
