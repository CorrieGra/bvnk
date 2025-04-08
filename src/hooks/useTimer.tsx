import { useEffect, useMemo, useState } from 'react';

export const useTimer = (targetTimestamp: number | null) => {
	const getRemaining = () =>
		targetTimestamp ? Math.max(targetTimestamp - Date.now(), 0) : null;
	const [remaining, setRemaining] = useState<number | null>(getRemaining());

	useEffect(() => {
		setRemaining(getRemaining());

		const interval = setInterval(() => {
			setRemaining(getRemaining());
		}, 1000);

		return () => clearInterval(interval);
	}, [targetTimestamp]);

	const getFormattedTime = useMemo(() => {
		if (remaining === null) return '--:--:--';

		const totalSeconds = Math.floor(remaining / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		const pad = (n: number) => n.toString().padStart(2, '0');
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}, [remaining]);

	const isExpired = remaining !== null && remaining <= 0;

	return {
		formatted: getFormattedTime,
		isExpired,
	};
};
