import { Icon, Typography } from 'components/atoms';

export const ExpiredQuotePage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				alignItems: 'center',
			}}
		>
			<Icon
				type='FaExclamationCircle'
				colour='coralorange'
			/>
			<Typography
				value='Payment details expired'
				variant='heading'
				colour='gray'
			/>
			<Typography
				value='The payment details for your transaction have expired.'
				variant='caption'
				colour='lightgray'
				padding={{ right: 0.25 }}
			/>
		</div>
	);
};
