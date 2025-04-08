import { Typography } from 'components/atoms';
import { Button, Card, List, Select } from 'components/molecule';
import { SelectOptionProps } from 'components/molecule/select/select';
import { PayInCurrency, PayInCurrencyAtom, QuoteAtom } from 'features/store';
import { useTimer } from 'hooks/useTimer';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ConditionalRender } from 'utils/index';
import { useQuote, useUpdateQuote } from 'hooks';

type AcceptPageParamas = {
	UUID: string;
};

export const AcceptQuotePage = () => {
	const navigate = useNavigate();
	const { UUID = '' } = useParams<AcceptPageParamas>();

	const redirect = useCallback(() => {
		navigate(`/payin/${UUID}/expired`);
	}, [UUID]);

	const { isLoading, error } = useQuote(UUID, redirect);
	const {
		updateQuote,
		isLoading: updateIsLoading,
		error: updateError,
	} = useUpdateQuote(UUID);
	const quote = useAtomValue(QuoteAtom);
	const [payinCurrency, setPayinCurrency] = useAtom(PayInCurrencyAtom);
	const { formatted, createTimer } = useTimer();

	useEffect(() => {
		if (!payinCurrency?.value) return;
		updateQuote(
			{ currency: payinCurrency.value, payInMethod: 'crypto' },
			`pay/${UUID}/update/summary`,
		);
	}, [payinCurrency?.value]);

	useEffect(() => {
		if (!quote?.acceptanceExpiryDate) return;
		const interval = createTimer(quote.acceptanceExpiryDate, 100, redirect);

		() => {
			interval.clear();
		};
	}, [quote?.acceptanceExpiryDate]);

	const handleCurrencySelect = (currency: SelectOptionProps) =>
		setPayinCurrency(currency as PayInCurrency);

	const handleConfirmation = useCallback(async () => {
		if (!payinCurrency?.value) return;
		updateQuote({ success_url: 'no_url' }, `pay/${UUID}/accept/summary`);
		navigate(`/payin/${UUID}/pay`);
	}, [UUID, payinCurrency?.value]);

	return (
		<>
			<Card.Header>
				<Typography
					value={quote?.merchantDisplayName}
					variant='title'
					colour='gray'
				/>
				<Typography
					value={`${quote?.displayCurrency.amount} ${quote?.displayCurrency.currency}`}
					variant='heading'
					colour='gray'
				/>
				<span style={{ display: 'flex', alignSelf: 'center' }}>
					<Typography
						value='For reference number:'
						variant='caption'
						colour='lightgray'
						padding={{ right: 0.25 }}
					/>
					<Typography
						value={`${quote?.reference}`}
						variant='caption'
						colour='gray'
						padding={{ left: 0.25 }}
					/>
				</span>
			</Card.Header>
			<Card.Body>
				<Select
					label='Pay with'
					placeholder='Select a currency'
					value={payinCurrency?.value ?? ''}
					onChange={handleCurrencySelect}
					options={[
						{
							label: 'Bitcoin',
							value: 'BTC',
						},
						{
							label: 'Ethereum',
							value: 'ETH',
						},
						{
							label: 'Litecoin',
							value: 'LTC',
						},
					]}
				/>

				<ConditionalRender when={payinCurrency && !!quote?.paidCurrency}>
					<List
						data={[
							{
								label: 'Amount due',
								value: `${quote?.paidCurrency.amount} ${quote?.paidCurrency.currency}`,
							},
							{
								label: 'Quote expires in',
								value: formatted,
							},
						]}
					/>
				</ConditionalRender>
			</Card.Body>

			<Card.Footer>
				<Button
					text='Confirm'
					onClick={handleConfirmation}
				/>
			</Card.Footer>
		</>
	);
};
