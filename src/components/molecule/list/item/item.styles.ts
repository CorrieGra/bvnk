import styled from 'styled-components';

const ListItemContainer = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${(props) => props.theme.spacing.s}rem;
	border-top: 0.5px solid ${(props) => props.theme.colours.lightgray};

	&:last-child {
		border-bottom: 0.5px solid ${(props) => props.theme.colours.lightgray};
	}
`;

const ListItemInnerContainer = styled.span`
	display: flex;
`;

export { ListItemContainer, ListItemInnerContainer };
