import { Typography } from 'components/atoms';

export const AcceptQuotePage = () => {
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
					value='Merchant Name'
					variant='title'
					colour='gray'
				/>
				<Typography
					value='200 USD'
					variant='heading'
					colour='gray'
				/>
				<span style={{ display: 'flex', alignSelf: 'center' }}>
					<Typography
						value='For reference number:'
						variant='caption'
						colour='lightgray'
						padding={{ right: 0.25 }}
					/>
					<Typography
						value='REF123457890'
						variant='caption'
						colour='gray'
						padding={{ left: 0.25 }}
					/>
				</span>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{/* TO BE REPLACED WITH INPUT MOLECULE */}
				<select>
					<option value='1'>Option 1</option>
					<option value='2'>Option 2</option>
					<option value='3'>Option 3</option>
				</select>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						value='Amount due'
						variant='body'
						colour='lightgray'
					/>
					<Typography
						value='0.00410775 BTC'
						variant='body'
						colour='gray'
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						value='Quote expires in'
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

			<div>
				<button style={{ display: 'inline-block', width: '100%' }}>
					Confirm
				</button>
			</div>
		</>
	);
};
