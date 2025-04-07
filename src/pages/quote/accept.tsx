import axios, { AxiosResponse } from 'axios';
import { Typography } from 'components/atoms';
import { Select } from 'components/molecule';
import { Quote } from 'dto/quote';
import {
	PayInCurrency,
	PayInCurrencyAtom,
	QuoteAtom,
} from 'features/store/payin';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

type AcceptPageParamas = {
	UUID: string;
};

const formatTimeFromTimestamps = (expiryDate: number) => {
	const msLeft = expiryDate - Date.now();

	if (msLeft <= 0) return '00:00:00';

	const totalSeconds = Math.floor(msLeft / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const pad = (n: number) => n.toString().padStart(2, '0');

	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const AcceptQuotePage = () => {
	const navigate = useNavigate();
	const [quote, setQuote] = useAtom(QuoteAtom);
	const [payinCurrency, setPayinCurrency] = useAtom(PayInCurrencyAtom);
	const { UUID } = useParams<AcceptPageParamas>();

	useEffect(() => {
		const getQuote = async () => {
			const quoteResponse = await axios.get<Quote>(
				`https://api.sandbox.bvnk.com/api/v1/pay/${UUID}/summary`,
			);

			setQuote(quoteResponse.data);
		};

		void getQuote();
	}, []);

	useEffect(() => {
		if (!!payinCurrency) {
			const data = {
				currency: payinCurrency,
				payInMethod: 'crypto',
			};

			const updateQuote = async () => {
				try {
					const quoteResponse = await axios.put<Quote>(
						`https://api.sandbox.bvnk.com/api/v1/pay/${UUID}/update/summary`,
						data,
					);

					const { data: updatedQuote } = quoteResponse;
					setQuote({ ...quote, ...updatedQuote });
				} catch (error) {
					navigate(`/payin/${UUID}/expired`);
				}
			};

			void updateQuote();
		}
	}, [payinCurrency]);

	const handleCurrencySelect = useCallback((currency: PayInCurrency) => {
		setPayinCurrency(currency);
	}, []);

	const handleConfirmation = useCallback(async () => {
		try {
			const data = { successUrl: 'no_url' };
			const quoteResponse = await axios.put(
				`https://api.sandbox.bvnk.com/api/v1/pay/${UUID}/accept/summary`,
				data,
			);
			const { data: updatedQuote } = quoteResponse;
			setQuote({ ...quote, ...updatedQuote });
			navigate(`/payin/${UUID}/pay`);
		} catch (error) {
			navigate(`/payin/${UUID}/expired`);
		}
	}, []);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					textAlign: 'center',
					alignItems: 'center',
				}}
			>
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
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Select
					label='Pay with'
					placeholder='Select a currency'
					value={payinCurrency ?? ''}
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

				{payinCurrency && (
					<>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Typography
								value='Amount due'
								variant='body'
								colour='lightgray'
							/>
							<Typography
								value={`${quote?.paidCurrency.amount} ${quote?.paidCurrency.currency}`}
								variant='body'
								colour='gray'
							/>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<Typography
								value='Quote expires in'
								variant='body'
								colour='lightgray'
							/>
							<Typography
								value={formatTimeFromTimestamps(quote?.expiryDate!)}
								variant='body'
								colour='gray'
							/>
						</div>
					</>
				)}
			</div>

			<div>
				<button
					style={{ display: 'inline-block', width: '100%' }}
					onClick={handleConfirmation}
				>
					Confirm
				</button>
			</div>
		</>
	);
};
