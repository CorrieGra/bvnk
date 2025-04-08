import { Typography } from 'components/atoms';
import { Card } from 'components/molecule';
import { QuoteAtom } from 'features/store/payin';
import { useAtom } from 'jotai';
import qrcode from 'qrcode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

type PayQuotePageParamas = {
	UUID: string;
};

export const PayQuotePage = () => {
	const navigate = useNavigate();
	const { UUID } = useParams<PayQuotePageParamas>();
	const [quote, _] = useAtom(QuoteAtom);
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

	const handleCopy = useCallback(
		(text: any) => {
			navigator.clipboard.writeText(text);
			toast('Copied to clipboard!');
		},
		[quote?.address, quote?.paidCurrency],
	);

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
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						value='Amount due'
						variant='body'
						colour='lightgray'
					/>
					<span style={{ display: 'flex' }}>
						<Typography
							value={`${quote?.paidCurrency.amount} ${quote?.paidCurrency.currency}`}
							variant='body'
							colour='gray'
						/>
						<span onClick={() => handleCopy(quote?.paidCurrency.amount)}>
							<Typography
								value='Copy'
								variant='body'
								colour='blue'
								padding={{ left: 0.5 }}
							/>
						</span>
					</span>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						value='BTC address'
						variant='body'
						colour='lightgray'
					/>
					<span style={{ display: 'flex' }}>
						<Typography
							value={quote?.address?.address}
							variant='body'
							colour='gray'
							truncated
						/>
						<span onClick={() => handleCopy(quote?.address?.address!)}>
							<Typography
								value='Copy'
								variant='body'
								colour='blue'
								padding={{ left: 0.5 }}
							/>
						</span>
					</span>
				</div>

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

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						value='Time left to pay'
						variant='body'
						colour='lightgray'
					/>
					<Typography
						value='00:00:31'
						variant='body'
						colour='gray'
					/>
				</div>
			</Card.Body>
			<ToastContainer />
		</>
	);
};
