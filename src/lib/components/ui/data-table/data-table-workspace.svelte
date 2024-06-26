<script lang="ts">
	import { get, readable } from 'svelte/store';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import type { Task } from './schemas';
	import {
		// DataTableCheckbox,
		DataTableColumnHeader,
		DataTablePagination,
		DataTableToolbar,
		DataTableAvatarCell,
		DataTableButton,
		DataTableActions,
		DataTableToolbarWorkspace
	} from './index.js';

	import * as Table from '$lib/components/ui/table';
	import type { WorkspaceType } from '$lib/schema';

	export let data: WorkspaceType[];

	const table = createTable(readable(data), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				return value.toLowerCase().includes(filterValue.toLowerCase());
			}
		}),
		colFilter: addColumnFilters(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'avatar',
			header: 'Avatar',
			id: 'avatar',
			cell: ({ value }) => {
				return createRender(DataTableAvatarCell, {
					src: value || 'CS',
					alt: 'Avatar'
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'id',
			header: 'UserID',
			id: 'id'
		}),
		table.column({
			accessor: 'name',
			header: 'Name',
			id: 'name'
		}),
		table.column({
			accessor: 'description',
			header: 'Description',
			id: 'description'
		}),
		table.display({
			header: '# Users',
			id: 'workspaces',
			cell: ({ row }) => {
				// @ts-expect-error This seems to be an error in the library
				return row.original.users.length || 0;
			}
		}),
		table.display({
			header: 'Actions',
			id: 'actions',
			cell: ({ row }) => {
				return createRender(DataTableActions, {
					// @ts-expect-error This seems to be an error in the library
					id: row.original.id,
					type: 'workspaces'
				});
			}
		})
	]);

	const tableModel = table.createViewModel(columns);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
</script>

<div class="space-y-4">
	<DataTableToolbarWorkspace {tableModel} {data} />
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										<!-- {#if cell.id !== 'select' && cell.id !== 'actions'}
											<DataTableColumnHeader {props} {tableModel} cellId={cell.id}>
												<Render of={cell.render()} /></DataTableColumnHeader
											>
										{:else} -->
										<Render of={cell.render()} />
										<!-- {/if} -->
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#if $pageRows.length}
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											{#if cell.id === 'task'}
												<div class="w-[80px]">
													<Render of={cell.render()} />
												</div>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<DataTablePagination {tableModel} />
</div>
