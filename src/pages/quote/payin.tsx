import { Typography } from 'components/atoms';
import qrcode from 'qrcode';
import { useEffect, useState } from 'react';

export const PayQuotePage = () => {
	const [QRCodeSVG, setQRCodeSVG] = useState<string>();

	useEffect(() => {
		const getQRCode = async () => {
			const svg = await qrcode.toDataURL('ax01123f0as9');
			setQRCodeSVG(svg);
		};

		void getQRCode();
	}, []);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					textAlign: 'center',
					alignItems: 'center',
				}}
			>
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
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
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
							value='0.00410775 BTC'
							variant='body'
							colour='gray'
						/>
						<Typography
							value='Copy'
							variant='body'
							colour='blue'
							padding={{ left: 0.5 }}
						/>
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
							value='ax01123f0as9'
							variant='body'
							colour='gray'
						/>
						<Typography
							value='Copy'
							variant='body'
							colour='blue'
							padding={{ left: 0.5 }}
						/>
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
							value='ax01123f0as9'
							variant='body'
							colour='gray'
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
			</div>
		</>
	);
};
