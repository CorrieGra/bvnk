import { colours } from 'assets/colour';
import { Card } from 'components/molecule';
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
			<Card>
				<Outlet />
			</Card>
		</div>
	);
};
