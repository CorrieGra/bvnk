import styled from 'styled-components';

export const StyledButton = styled.button`
	padding: ${(props) => props.theme.spacing.s}rem;
	display: inline-block;
	width: 100%;
	border: none;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colours.blue};
`;
