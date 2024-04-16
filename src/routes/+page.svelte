<script>
	import Timer from '$lib/components/Timer.svelte';
	import { active } from '$lib/stores/timer';

	let isBreak = false;
	let workTime = 25;
	let breakTime = 5;

	function onComplete() {
		isBreak = !isBreak;
	}
</script>

<div class="container">
	<main>
		{#if !isBreak}
			<kbd>Working</kbd>
			<Timer minutes={workTime} {onComplete} />
		{:else}
			<kbd>On Break</kbd>
			<Timer minutes={breakTime} {onComplete} />
		{/if}
	</main>

	<div class="config">
		<label for="work">Work</label>
		<input type="number" disabled={$active} name="work" bind:value={workTime} />
		<label for="rest">Rest</label>
		<input type="number" disabled={$active} name="rest" bind:value={breakTime} />
	</div>
</div>

<style>
	:root {
		font-size: 22px;
	}

	:global(html), :global(body), .container {
		height: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 1rem;
	}

	:global(*) {
		box-sizing: border-box;
		font-family: monospace;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.config {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-size: 0.85rem;
	}
</style>
