import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'app/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<App />}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
