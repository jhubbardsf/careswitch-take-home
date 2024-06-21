<script lang="ts">
	import type { PageData } from './$types.js';
	import UserForm from '$lib/components/forms/UserForm.svelte';
	export let data: PageData;
</script>

<UserForm data={data.form} />
