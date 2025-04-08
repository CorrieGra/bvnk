import styled from 'styled-components';

const CardContainer = styled.div`
	padding: ${(props) => props.theme.spacing.l}rem;
	background-color: ${(props) => props.theme.colours.white};
	border-radius: 10px;
	max-width: fit-content;
`;

const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
`;

const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${(props) => props.theme.spacing.s}rem;
`;

const CardFooter = styled.div`
	margin-top: ${(props) => props.theme.spacing.s}rem;
`;

export { CardContainer, CardHeader, CardBody, CardFooter };
