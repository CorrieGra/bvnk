import { ListItem } from './item';
import { ListContainer } from './list.styles';

export type ListData = {
	label: string;
	value: string;
	canBeCopied?: boolean;
	truncateValue?: boolean;
};

type ListProps = {
	data: ListData[];
};

export const List = (props: ListProps) => {
	const { data } = props;

	return (
		<ListContainer>
			{data.map(({ label, value, canBeCopied, truncateValue }) => (
				<ListItem
					label={label}
					value={value}
					canBeCopied={!!canBeCopied}
					truncateValue={!!truncateValue}
				/>
			))}
		</ListContainer>
	);
};
