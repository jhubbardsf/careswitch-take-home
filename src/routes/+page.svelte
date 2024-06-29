<script>
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	import {
		LayoutGrid,
		Users,
		UserPlus,
		FolderPlus,
		PieChart,
		LineChart,
		MoveHorizontal
	} from 'lucide-svelte';
	import Line from '$lib/components/Line.svelte';
	import Pie from '$lib/components/Pie.svelte';

	const { data } = $props();
	console.log({ data });
</script>

<div class="flex h-full w-full flex-col gap-4 scroll-auto p-4 md:p-6 lg:p-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">Total Users</CardTitle>
				<Users class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">2,350</div>
				<p class="text-xs text-muted-foreground">+5.2% from last week</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">Total Workspaces</CardTitle>
				<LayoutGrid class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">145</div>
				<p class="text-xs text-muted-foreground">+3.1% from last week</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">New Users (30 days)</CardTitle>
				<UserPlus class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">+325</div>
				<p class="text-xs text-muted-foreground">+12% from last period</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">New Workspaces (30 days)</CardTitle>
				<FolderPlus class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">+18</div>
				<p class="text-xs text-muted-foreground">+8% from last period</p>
			</CardContent>
		</Card>
	</div>

	<div class="flex gap-4">
		<Card class="flex flex-1 flex-col">
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">Users to Workspaces Ratio</CardTitle>
				<PieChart class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent class="flex flex-grow items-center justify-center">
				<div class="flex h-full flex-col items-center justify-center">
					<Pie users={data.users} workspaces={data.workspaces} />
					<!-- <div class="text-4xl font-bold">Ratio Chart</div> -->
				</div>
			</CardContent>
		</Card>

		<Card class="flex flex-col place-self-stretch">
			<CardHeader class="flex flex-col items-center justify-between pb-2">
				<CardTitle class="text-sm font-medium">Users and Workspaces Added Per Month</CardTitle>
				{#if data.userWorkspaceAddedPerMonth}
					<Line data={data.userWorkspaceAddedPerMonth} />
				{/if}
			</CardHeader>
		</Card>
	</div>
</div>
