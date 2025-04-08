import { Icon, Typography } from 'components/atoms';
import { Card } from 'components/molecule';

export const ExpiredQuotePage = () => {
	return (
		<Card.Header>
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
		</Card.Header>
	);
};
