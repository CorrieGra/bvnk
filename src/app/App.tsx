import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/theme';
import { BrowserRouter, Route, Routes } from 'react-router';
import { BVNKRoutes } from 'routes';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{BVNKRoutes.map(({ path, element: Element, children, index }) =>
						children?.length ? (
							<Route
								path={path}
								element={<Element />}
							>
								{children.map(
									({ path: childPath, element: ChildElement, index }) => (
										<Route
											index={!!index}
											path={childPath}
											element={<ChildElement />}
										/>
									),
								)}
							</Route>
						) : (
							<Route
								index={index}
								path={path}
								element={<Element />}
							/>
						),
					)}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
