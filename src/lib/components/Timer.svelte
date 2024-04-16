<script lang="ts">
	import { timer, active } from '$lib/stores/timer';
	import timerFinishedSound from '$lib/audio/complete.wav';

	export let minutes: number;
	export let onComplete: () => void;

	const ding = new Audio(timerFinishedSound);
	let timerClass = 'timer';

	function formatTime(time: number, length = 1) {
		return time.toString().padStart(length, '0');
	}

	$: totalMs = minutes * 60 * 1000;
	$: remainingTime = Math.max(totalMs - $timer, 0);
	$: remainingMinutes = Math.max(Math.floor(remainingTime / 1000 / 60), 0);
	$: remainingSeconds = formatTime(Math.max(Math.floor((remainingTime / 1000) % 60), 0), 2);
	$: isComplete = remainingTime <= 0 && $active;
	$: {
		if (isComplete) {
			ding.play();
			onComplete();
			timer.reset();
		}
	}
</script>

<div>
	<p class={timerClass}>
		{remainingMinutes}:{remainingSeconds}
	</p>
	<div class="controls">
		{#if $active}
			<button on:click={timer.stop}>Stop</button>
		{:else}
			<button on:click={timer.start}>Start</button>
		{/if}
		<button on:click={timer.reset}>Reset</button>
	</div>
</div>

<style>
	.timer {
		font-family: monospace;
		margin: 0;
		font-size: 4rem;
		font-weight: bold;
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}
</style>
