import styled, { css } from 'styled-components';
import { TypographyProps } from './typography.types';

type TypographyStyleProps = Pick<
	TypographyProps,
	'variant' | 'colour' | 'padding' | 'margin' | 'truncated'
>;

export const StyledTypography = styled.p<TypographyStyleProps>`
	font-size: ${(props) => props.theme.typography[props.variant].size}rem;
	font-weight: ${(props) => props.theme.typography[props.variant].weight};
	line-height: ${(props) =>
		props.theme.typography[props.variant].lineHeight}rem;
	letter-spacing: ${(props) =>
		props.theme.typography[props.variant].letterSpacing};
	color: ${(props) => props.theme.colours[props.colour]};
	margin-top: ${(props) => props.margin?.top || 0}rem;
	margin-right: ${(props) => props.margin?.right || 0}rem;
	margin-bottom: ${(props) => props.margin?.bottom || 0}rem;
	margin-left: ${(props) => props.margin?.left || 0}rem;
	padding-top: ${(props) => props.padding?.top || 0}rem;
	padding-right: ${(props) => props.padding?.right || 0}rem;
	padding-bottom: ${(props) => props.padding?.bottom || 0}rem;
	padding-left: ${(props) => props.padding?.left || 0}rem;
	max-width: 47ch;

	${(props) =>
		props.truncated &&
		css`
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			display: block;
			max-width: 24ch;
		`}
`;
