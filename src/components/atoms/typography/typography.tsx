import { colours, typography } from 'assets/index';
import { StyledTypography } from './typography.styles';
import { memo } from 'react';

export type TypographySpacing = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
};

export type TypographyProps = {
	variant: keyof typeof typography;
	colour: keyof typeof colours;
	padding?: TypographySpacing;
	margin?: TypographySpacing;
	value?: string;
	truncated?: boolean;
};

export const Typography = (props: TypographyProps) => {
	const { variant, value, colour, margin, padding, truncated } = props;

	return (
		<StyledTypography
			variant={variant}
			colour={colour}
			padding={padding}
			margin={margin}
			truncated={!!truncated}
		>
			{value}
		</StyledTypography>
	);
};
