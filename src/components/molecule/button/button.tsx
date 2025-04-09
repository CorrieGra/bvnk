import { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './button.styles';
import { Typography } from 'components/atoms/index';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	value: string;
};

export const Button = (props: ButtonProps) => {
	const { value } = props;

	return (
		<StyledButton {...props}>
			<Typography
				value={value}
				$variant='body'
				$colour='white'
			/>
		</StyledButton>
	);
};
