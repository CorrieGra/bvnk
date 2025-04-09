import { ReactNode } from 'react';
import {
	AcceptQuotePage,
	ExpiredQuotePage,
	PayinPageWrapper,
	PayQuotePage,
} from 'pages/quote';

type BVNKRoute = {
	path: string;
	element: () => ReactNode;
	index?: boolean;
	children?: Omit<BVNKRoute, 'children'>[];
};

export const BVNKRoutes: BVNKRoute[] = [
	{
		path: '/payin',
		element: PayinPageWrapper,
		children: [
			{
				path: ':UUID',
				element: AcceptQuotePage,
				index: true,
			},
			{
				path: ':UUID/pay',
				element: PayQuotePage,
				index: true,
			},
			{
				path: ':UUID/expired',
				element: ExpiredQuotePage,
				index: true,
			},
		],
	},
];
