import { Typography } from 'components/atoms';
import { Card, List, QRCode } from 'components/molecule';
import { PayInCurrencyAtom, QuoteAtom } from 'features/store';
import { useQuote, useTimer } from 'hooks';
import { useAtomValue } from 'jotai';
import qrcode from 'qrcode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { ConditionalRender } from 'utils/index';

type PayQuotePageParamas = {
	UUID: string;
};

export const PayQuotePage = () => {
	const navigate = useNavigate();
	const { UUID = '' } = useParams<PayQuotePageParamas>();

	const redirect = useCallback(() => {
		navigate(`/payin/${UUID}/expired`);
	}, [UUID]);

	const { isLoading, error } = useQuote(UUID, redirect);
	const quote = useAtomValue(QuoteAtom);
	const payInCurrency = useAtomValue(PayInCurrencyAtom);
	const [QRCodeSVG, setQRCodeSVG] = useState<string>();
	const { formatted, createTimer } = useTimer();

	useEffect(() => {
		if (!quote?.expiryDate) return;
		const interval = createTimer(quote.expiryDate, 1000, redirect);

		const getQRCode = async (address: string) => {
			const svg = await qrcode.toDataURL(address);
			setQRCodeSVG(svg);
		};

		if (quote.address) {
			getQRCode(quote.address.address);
		}

		return () => {
			interval.clear();
		};
	}, [quote]);

	return (
		<>
			<Card.Header>
				<Typography
					value={`Pay with ${payInCurrency?.label}`}
					variant='title'
					colour='gray'
				/>
				<Typography
					value={`To complete this payment send the amount due to the ${payInCurrency?.value} address provided below.`}
					variant='caption'
					colour='lightgray'
					padding={{ right: 0.25 }}
					margin={{ top: 1 }}
				/>
			</Card.Header>
			<Card.Body>
				<List
					data={[
						{
							label: 'Amount due',
							value: `${quote?.paidCurrency.amount} ${quote?.paidCurrency.currency}`,
							canBeCopied: true,
						},
						{
							label: `${payInCurrency?.label} address`,
							value: quote?.address?.address || '',
							canBeCopied: true,
							truncateValue: true,
						},
					]}
				/>

				<ConditionalRender when={!!QRCodeSVG}>
					<QRCode
						src={QRCodeSVG!}
						caption={quote?.address?.address!}
					/>
				</ConditionalRender>

				<List
					data={[
						{
							label: 'Time left to pay',
							value: formatted,
						},
					]}
				/>
			</Card.Body>
			<ToastContainer />
		</>
	);
};
