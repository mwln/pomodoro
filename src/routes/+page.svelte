<script>
	import Timer from '$lib/components/Timer.svelte';
	import { active } from '$lib/stores/timer';
	import { onMount } from 'svelte';
	import { appWindow } from '@tauri-apps/api/window';
	import {
		isPermissionGranted,
		sendNotification,
		requestPermission
	} from '@tauri-apps/api/notification';

	let notificationsAllowed = false;
	let permission = '';
	let isBreak = false;
	let workTime = 25;
	let breakTime = 5;
	let isWebview = false;

	$: session = isBreak ? 'Work' : 'Break';

	onMount(async () => {
		notificationsAllowed = await isPermissionGranted();
		if (!notificationsAllowed) {
			permission = await requestPermission();
			notificationsAllowed = permission === 'granted';
		}
		isWebview = '__TAURI_IPC__' in window;
	});

	async function onComplete() {
		if (notificationsAllowed) {
			sendNotification({
				title: `${session} Complete!`,
				body: `Your ${session} has finished. Hit start to begin the next one.`
			});
		}
		if (isWebview) {
			await appWindow.setFocus();
		} else {
			parent.focus();
			window.focus();
		}
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
	:global(:root) {
		font-size: 22px;
		--light: #f8fafc; /* slate-50 */
		--dark: #020617; /* slate-950 */
		--light-border: #cbd5e1; /* slate-300 */
		--dark-border: #1e293b; /* slate-800 */
	}

	:global(body, input, button) {
		color: var(--dark);
		background-color: var(--light);
		border-color: var(--light-border);
	}

	:global(input, button) {
		border-style: solid;
		border-radius: 2px;
	}

	:global(input) {
		padding: 0.2rem;
	}

	:global(input[type='number']) {
		apperance: textfield;
	}

	@media (prefers-color-scheme: dark) {
		:global(body, input, button) {
			color: var(--light);
			background-color: var(--dark);
			border-color: var(--dark-border);
		}
	}

	:global(html),
	:global(body),
	.container {
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
