import { useCallback, useEffect, useMemo, useState } from 'react';

export const useTimer = () => {
	const getRemaining = (targetTimestamp: number) =>
		Math.max(targetTimestamp - Date.now(), 0);
	const [remaining, setRemaining] = useState<number>(1);

	const createTimer = useCallback(
		(
			targetTimestamp: number,
			duration: number,
			cb: () => void,
		): { clear: () => any } => {
			setRemaining(getRemaining(targetTimestamp));

			const interval = setInterval(() => {
				const newRemaining = getRemaining(targetTimestamp);
				setRemaining(newRemaining);

				if (newRemaining <= 0) {
					clearInterval(interval);
					cb();
				}
			}, duration);

			return {
				clear: () => clearInterval(interval),
			};
		},
		[],
	);

	const getFormattedTime = useMemo(() => {
		if (remaining === 0) return '00:00:00';

		const totalSeconds = Math.floor(remaining / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		const pad = (n: number) => n.toString().padStart(2, '0');
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}, [remaining]);

	return {
		createTimer,
		formatted: getFormattedTime,
	};
};
