import { useEffect, useState } from 'react';
import { AxiosInstance } from 'services/index';
import { Quote } from 'dto/quote';
import { useAtom } from 'jotai';
import { QuoteAtom } from 'features/store';

type UseQuoteResult = {
	isLoading: boolean;
	error: unknown;
};

export const useQuote = (
	UUID: string | null,
	redirect: any,
): UseQuoteResult => {
	const [_, setQuote] = useAtom(QuoteAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		if (!UUID) return;

		const controller = new AbortController();

		const fetchQuote = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await AxiosInstance<Quote>({
					method: 'GET',
					url: `pay/${UUID}/summary`,
					signal: controller.signal,
				});

				const quoteData = response.data;

				if (quoteData.status === 'EXPIRED') {
					redirect();
				}

				setQuote(quoteData);
			} catch (err) {
				if ((err as any).code !== 'ERR_CANCELED') {
					setError(err);
					console.error('Error fetching quote:', err);
				}
			} finally {
				setIsLoading(false);
			}
		};

		void fetchQuote();

		return () => {
			controller.abort();
		};
	}, [UUID, redirect]);

	return { isLoading, error };
};
