import { colours, typography } from 'assets/index';

export type TypographySpacing = {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
};

export type TypographyProps = {
	$variant: keyof typeof typography;
	$colour: keyof typeof colours;
	$padding?: TypographySpacing;
	$margin?: TypographySpacing;
	value?: string;
	$truncated?: boolean;
};
