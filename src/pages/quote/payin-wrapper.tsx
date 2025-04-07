import { colours } from 'assets/colour';
import { Outlet } from 'react-router';

export const PayinPageWrapper = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				backgroundColor: `${colours['lightgray']}`,
			}}
		>
			<div
				style={{
					padding: 24,
					backgroundColor: 'white',
					borderRadius: 10,
					maxWidth: 'fit-content',
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};
