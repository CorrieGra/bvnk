import { StyledTypography } from './typography.styles';
import { TypographyProps } from './typography.types';

export const Typography = (props: TypographyProps) => {
	const { $variant, value, $colour, $margin, $padding, $truncated } = props;

	return (
		<StyledTypography
			$variant={$variant}
			$colour={$colour}
			$padding={$padding}
			$margin={$margin}
			$truncated={!!$truncated}
		>
			{value}
		</StyledTypography>
	);
};
