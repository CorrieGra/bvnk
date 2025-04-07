import { colours } from 'assets/colour';
import { typography } from 'assets/typography';
import { spacing } from 'assets/spacing';
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colours: typeof colours;
		spacing: typeof spacing;
		typography: typeof typography;
	}
}
