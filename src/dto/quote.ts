export type CurrencyAmount = {
	currency: string | null;
	amount: number;
	actual: number;
};

type QuoteAddress = {
	address: string;
	tag: string;
	protocol: string;
	uri: string;
	alternatives: any[];
};

export interface Quote {
	uuid: string;
	merchantDisplayName: string;
	merchantId: string;
	dateCreated: number;
	expiryDate: number;
	quoteExpiryDate: number | null;
	acceptanceExpiryDate: number | null;
	quoteStatus: 'TEMPLATE';
	reference: string;
	type: 'IN' | 'OUT';
	subType: string;
	status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
	displayCurrency: CurrencyAmount;
	walletCurrency: CurrencyAmount;
	paidCurrency: CurrencyAmount;
	feeCurrency: CurrencyAmount;
	networkFeeCurrency: CurrencyAmount | null;
	displayRate: number | null;
	exchangeRate: number | null;
	address: QuoteAddress | null;
	returnUrl: string;
	redirectUrl: string;
	transactions: any[];
	refund: any | null;
	refunds: any[];
	currencyOptions: any[];
	flow: string;
	twoStep: boolean;
	customerId: string;
	code?: string;
}
