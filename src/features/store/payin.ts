import { Quote } from 'dto/quote';
import { atom } from 'jotai';

type PayInCurrency = 'BTC' | 'ETH' | 'LTC';

const QuoteAtom = atom<Quote | null>(null);
const PayInCurrencyAtom = atom<PayInCurrency | null>(null);

export { QuoteAtom, PayInCurrencyAtom };
export type { PayInCurrency };
