import { Quote } from 'dto/quote';
import { atomWithSessionStorage } from './persistant-atom';

type PayInCurrency = 'BTC' | 'ETH' | 'LTC';

const QuoteAtom = atomWithSessionStorage<Quote | null>('quote', null);
const PayInCurrencyAtom = atomWithSessionStorage<PayInCurrency | null>(
	'payInCurrency',
	null,
);

export { QuoteAtom, PayInCurrencyAtom };
export type { PayInCurrency };
