import { Typography } from 'components/atoms';
import { ListItemContainer, ListItemInnerContainer } from './item.styles';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { ListData } from '../';

export const ListItem = (props: ListData) => {
	const { label, value, canBeCopied, truncateValue } = props;

	const handleCopy = useCallback((text: any) => {
		navigator.clipboard.writeText(text);
		toast('Copied to clipboard!', { style: { fontSize: '1.6rem' } });
	}, []);

	return (
		<ListItemContainer>
			<Typography
				value={label}
				variant='body'
				colour='lightgray'
			/>
			<ListItemInnerContainer>
				<Typography
					value={value}
					variant='body'
					colour='gray'
					truncated={truncateValue}
				/>
				{canBeCopied && (
					<span onClick={() => handleCopy(value)}>
						<Typography
							value='Copy'
							variant='body'
							colour='blue'
							padding={{ left: 0.5 }}
						/>
					</span>
				)}
			</ListItemInnerContainer>
		</ListItemContainer>
	);
};
