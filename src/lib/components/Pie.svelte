<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	const { users, workspaces } = $$props;
	let chartCanvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(chartCanvas, {
			type: 'pie',
			data: {
				labels: ['New Users', 'New Workspaces'],
				datasets: [
					{
						data: [users, workspaces],
						backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)']
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top'
					},
					title: {
						display: false,
						text: 'New Users and Workspaces in the Last Month'
					}
				}
			}
		});
	});
</script>

<div style="width: 400px; height: 400px;">
	<canvas bind:this={chartCanvas} id="pieChartCanvas"></canvas>
</div>
