<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;

	const { form, errors, message, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<div class="mx-auto mt-8 max-w-lg">
	<h3 class="mb-4 text-2xl font-bold">Superforms testing ground - Zod</h3>

	{#if $message}
		<div
			class={`status ${$page.status >= 400 ? 'bg-red-500' : 'bg-green-500'} mb-4 rounded-md p-2 text-white`}
		>
			{$message}
		</div>
	{/if}

	<form method="POST" use:enhance class="space-y-4">
		<div class="flex flex-col">
			<label class="mb-2 text-lg font-semibold">Name</label>
			<input
				name="name"
				class="rounded-md border p-2"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
			/>
			{#if $errors.name}
				<span class="mt-1 text-red-500">{$errors.name}</span>
			{/if}
		</div>

		<div class="flex flex-col">
			<label class="mb-2 text-lg font-semibold">Email</label>
			<input
				name="email"
				type="email"
				class="rounded-md border p-2"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<span class="mt-1 text-red-500">{$errors.email}</span>
			{/if}
		</div>

		<button class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Submit</button>
	</form>

	<hr class="my-8" />
	<p class="text-center">
		💥 <a class="text-blue-500 hover:underline" target="_blank" href="https://superforms.rocks"
			>Created with Superforms for SvelteKit</a
		> 💥
	</p>
</div>

<style>
	.status {
		color: white;
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
	}
</style>
