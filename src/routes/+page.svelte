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

<label for="work">Work</label>
<input type="number" disabled={$active} name="work" bind:value={workTime} />
<label for="rest">Rest</label>
<input type="number" disabled={$active} name="rest" bind:value={breakTime} />

<hr />

<main>
	{#if !isBreak}
		<kbd>Working</kbd>
		<Timer minutes={workTime} {onComplete} />
	{:else}
		<kbd>On Break</kbd>
		<Timer minutes={breakTime} {onComplete} />
	{/if}
</main>
