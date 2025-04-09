import { useCallback, useRef, useState } from 'react';
import { AxiosInstance } from 'services';
import { Quote } from 'dto/quote';
import { useAtom } from 'jotai';
import { QuoteAtom } from 'features/store';

type UseUpdateQuoteResult = {
	updateQuote: (data: any, url: string) => Promise<void>;
	quote: Quote | null;
	isLoading: boolean;
	error: unknown;
};

export const useUpdateQuote = (
	UUID: string,
	redirect: () => void,
): UseUpdateQuoteResult => {
	const [quote, setQuote] = useAtom(QuoteAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const updateQuote = useCallback(
		async (data: any, url: string) => {
			if (!UUID) return;

			const controller = new AbortController();

			setIsLoading(true);
			setError(null);

			try {
				const response = await AxiosInstance<Quote>({
					method: 'PUT',
					url,
					data,
					signal: controller.signal,
				});

				const quoteData = response.data;
				setQuote(quoteData);
			} catch (err) {
				if ((err as any).response.data.code === 'MER-PAY-2017') {
					redirect();
				} else {
					setError(err);
				}
			} finally {
				setIsLoading(false);
			}
		},
		[UUID],
	);

	return { quote, updateQuote, isLoading, error };
};
