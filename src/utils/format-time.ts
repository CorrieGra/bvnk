export const formatTimeFromTimestamps = (expiryDate: number) => {
	const msLeft = expiryDate - Date.now();

	if (msLeft <= 0) return '00:00:00';

	const totalSeconds = Math.floor(msLeft / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (n: number) => n.toString().padStart(2, '0');

	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
