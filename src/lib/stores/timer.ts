import { writable } from 'svelte/store';

export const active = writable(false);

function createTimer() {
	const { subscribe, set } = writable(0);

	let elapsed = 0;
	let startTime: Date | undefined;
	let intervalId: number;

	function stopInterval() {
		clearInterval(intervalId);
		active.set(false);
	}

	function differenceInMilliseconds(start: Date, end: Date): number {
		return Math.abs(+end - +start);
	}

	function start() {
		active.set(true);
		startTime = new Date();
		if (elapsed !== 0) {
			startTime = new Date(new Date().getTime() - elapsed);
		}
		intervalId = setInterval(() => {
			elapsed = differenceInMilliseconds(new Date(), startTime as Date);
			set(elapsed);
		}, 100);
	}

	function stop() {
		elapsed = differenceInMilliseconds(new Date(), startTime as Date);
		set(elapsed);
		stopInterval();
	}

	function reset() {
		stopInterval();
		startTime = undefined;
		elapsed = 0;
		set(0);
	}

	return {
		subscribe,
		start,
		stop,
		reset
	};
}

export const timer = createTimer();
