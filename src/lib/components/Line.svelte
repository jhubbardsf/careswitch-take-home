<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	const data = [
		{ year: 2010, acquisitions: 10, revenue: 100 },
		{ year: 2011, acquisitions: 20, revenue: 120 },
		{ year: 2012, acquisitions: 15, revenue: 150 },
		{ year: 2013, acquisitions: 25, revenue: 180 },
		{ year: 2014, acquisitions: 22, revenue: 200 },
		{ year: 2015, acquisitions: 30, revenue: 220 },
		{ year: 2016, acquisitions: 28, revenue: 250 }
	];

	let chartCanvas: HTMLCanvasElement;
	onMount(async () => {
		new Chart(chartCanvas, {
			type: 'line',
			data: {
				labels: data.map((row) => row.year),
				datasets: [
					{
						label: 'Acquisitions',
						data: data.map((row) => row.acquisitions),
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					},
					{
						label: 'Revenue (in millions)',
						data: data.map((row) => row.revenue),
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
