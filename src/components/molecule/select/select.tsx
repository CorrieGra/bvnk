import { useEffect, useRef, useState } from 'react';
import {
	SelectAccessory,
	SelectContainer,
	SelectControlContainer,
	SelectControl,
	SelectOption,
	SelectLabel,
	SelectOptionContainer,
} from './select.styles';
import { Icon, Typography } from 'components/atoms';

export type SelectOptionProps = {
	label: string;
	value: string;
};

export type SelectProps = {
	label: string;
	value: string;
	placeholder: string;
	options: SelectOptionProps[];
	onChange: (selection: string) => void;
};

export const Select = (props: SelectProps) => {
	const { label, options, value, placeholder, onChange } = props;

	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const selectedOption = options.find((opt) => opt.value === value);

	useEffect(() => {
		const handleClose = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClose);
		return () => document.removeEventListener('mousedown', handleClose);
	}, []);

	return (
		<SelectContainer ref={wrapperRef}>
			<SelectLabel>
				<Typography
					value={label}
					variant='body'
					colour='lightgray'
				/>
			</SelectLabel>
			<SelectControlContainer onClick={() => setIsOpen((prev) => !prev)}>
				<SelectControl>
					<Typography
						value={selectedOption?.value || placeholder}
						variant='body'
						colour='gray'
					/>
				</SelectControl>
				<SelectOptionContainer isOpen={isOpen}>
					{options.map((option) => (
						<SelectOption onClick={(e) => onChange(option.value)}>
							<Typography
								value={option.value}
								variant='body'
								colour='gray'
							/>
						</SelectOption>
					))}
				</SelectOptionContainer>
				<SelectAccessory>
					<Icon type='FaChevronDown' />
				</SelectAccessory>
			</SelectControlContainer>
		</SelectContainer>
	);
};
