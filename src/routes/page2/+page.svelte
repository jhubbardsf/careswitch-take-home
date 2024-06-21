<script lang="ts">
	import { Link } from '$lib/components/ui/link';
	import * as Table from '$lib/components/ui/table';
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	import {
		GridSolid,
		MailBoxSolid,
		UserSolid,
		ArrowRightToBracketOutline,
		EditOutline,
		UsersGroupSolid,
		SwatchbookSolid
	} from 'flowbite-svelte-icons';

	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	let activeUrl = $state($page.url.pathname);

	let { data } = $props();
</script>

<div class="mx-auto mt-8 flex max-w-3xl px-4 sm:px-6 lg:px-8">
	<Sidebar class="p-3">
		<SidebarWrapper>
			<SidebarGroup>
				<SidebarItem label="Users" href="/users/read">
					<svelte:fragment slot="icon">
						<UserSolid
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Workbooks" {spanClass}>
					<svelte:fragment slot="icon">
						<GridSolid
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
						>
							Pro
						</span>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Inbox" {spanClass}>
					<svelte:fragment slot="icon">
						<MailBoxSolid
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="text-primary-600 bg-primary-200 dark:bg-primary-900 dark:text-primary-200 ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full p-3 text-sm font-medium"
						>
							3
						</span>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Users">
					<svelte:fragment slot="icon">
						<UserSolid
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Sign In">
					<svelte:fragment slot="icon">
						<ArrowRightToBracketOutline
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Sign Up">
					<svelte:fragment slot="icon">
						<EditOutline
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
	<div class="m-4 space-y-6 rounded-md border p-4">
		<div class="inline-block w-min border border-rose-600 p-4"></div>
		<p>
			Welcome to the Careswitch take-home assignment! If you followed the quickstart guide in the
			README, you should see the table below populated with the seeded users:
		</p>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>View</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.users as user (user.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell
							><Link href={`/users/view/${user.id}`} class="dark:hover:bg-blue-950">View</Link
							></Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
