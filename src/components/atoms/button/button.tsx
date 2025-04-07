import { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './button.styles';
import { Typography } from '../typography';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string;
};

export const Button = (props: ButtonProps) => {
	const { text } = props;

	return (
		<StyledButton {...props}>
			<Typography
				value={text}
				variant='body'
				colour='white'
			/>
		</StyledButton>
	);
};
