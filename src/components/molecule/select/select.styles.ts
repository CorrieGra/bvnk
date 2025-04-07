import styled from 'styled-components';

const SelectContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	font-family: inherit;
	gap: ${(props) => props.theme.spacing.xs}rem;
`;

const SelectLabel = styled.span``;

const SelectControlContainer = styled.div`
	position: relative;
`;

const SelectControl = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 4px;
	background: white;
	cursor: pointer;
	padding: ${(props) => props.theme.spacing.s + 0.2}rem
		${(props) => props.theme.spacing.s + 0.4}rem;
	border: 1px solid ${(props) => props.theme.colours.lightgray};
	min-height: ${(props) => props.theme.spacing.xs * 10}rem;
`;

const SelectOptionContainer = styled.div<{ isOpen: boolean }>`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: white;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	max-height: ${(props) => props.theme.spacing.l * 10}rem;
	overflow-y: auto;
	z-index: 10;
	margin-top: ${(props) => props.theme.spacing.xs}rem;
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const SelectOption = styled.div`
	padding: ${(props) => props.theme.spacing.s + 0.2}rem
		${(props) => props.theme.spacing.s + 0.4}rem;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.colours.lightgray};
	}
`;

const SelectAccessory = styled.div`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export {
	SelectContainer,
	SelectLabel,
	SelectControlContainer,
	SelectControl,
	SelectOptionContainer,
	SelectOption,
	SelectAccessory,
};
