import { Typography } from 'components/atoms';
import { Card, List } from 'components/molecule';
import { PayInCurrencyAtom, QuoteAtom } from 'features/store/payin';
import { useAtom, useAtomValue } from 'jotai';
import qrcode from 'qrcode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer } from 'react-toastify';

type PayQuotePageParamas = {
	UUID: string;
};

export const PayQuotePage = () => {
	const navigate = useNavigate();
	const { UUID } = useParams<PayQuotePageParamas>();
	const [quote, _] = useAtom(QuoteAtom);
	const payInCurrency = useAtomValue(PayInCurrencyAtom);
	const [QRCodeSVG, setQRCodeSVG] = useState<string>();

	useEffect(() => {
		const getQRCode = async () => {
			try {
				const svg = await qrcode.toDataURL(quote?.address?.address!);
				setQRCodeSVG(svg);
			} catch (_) {
				navigate(`/payin/${UUID}/expired`);
			}
		};

		void getQRCode();
	}, [quote]);

	return (
		<>
			<Card.Header>
				<Typography
					value='Pay with Bitcoin'
					variant='title'
					colour='gray'
				/>
				<Typography
					value='To complete this payment send the amount due to the BTC address provided below.'
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
							label: `${payInCurrency} address`,
							value: quote?.address?.address || '',
							canBeCopied: true,
							truncateValue: true,
						},
					]}
				/>

				{QRCodeSVG && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<img
							src={QRCodeSVG}
							width={140}
							height={140}
						/>
						<Typography
							value={quote?.address?.address}
							variant='body'
							colour='lightgray'
						/>
					</div>
				)}

				<List
					data={[
						{
							label: 'Time left to pay',
							value: quote?.quoteExpiryDate!.toString() ?? '00:00:00',
						},
					]}
				/>
			</Card.Body>
			<ToastContainer />
		</>
	);
};
