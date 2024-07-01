<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
</script>

<Menubar.Root class="fixed top-0 flex w-screen items-center justify-center">
	<Menubar.Menu>
		<Menubar.Trigger>Users</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item href="/users">List</Menubar.Item>
			<Menubar.Item href="/users/create">Create</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Workspaces</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>Undo</Menubar.Item>
			<Menubar.Item>Redo</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
