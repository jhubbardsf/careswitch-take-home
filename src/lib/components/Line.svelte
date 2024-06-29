<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let data: Array<{
		month: string;
		userCount: number;
		workspaceCount: number;
	}>;

	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(chartCanvas, {
			type: 'line',
			data: {
				labels: data.map((row) => row.month),
				datasets: [
					{
						label: 'Users',
						data: data.map((row) => row.userCount),
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					},
					{
						label: 'Workspaces',
						data: data.map((row) => row.workspaceCount),
						borderColor: 'rgb(255, 99, 132)',
						tension: 0.1
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<div style="width: 800px;">
	<canvas bind:this={chartCanvas} id="chartCanvas"></canvas>
</div>
