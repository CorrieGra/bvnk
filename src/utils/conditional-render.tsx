import { ReactNode } from 'react';

type ConditionRenderProps = {
	when: boolean | null;
	fallback?: ReactNode | null;
	children: ReactNode | ((item: any) => ReactNode | Promise<ReactNode>);
};

export const ConditionalRender = ({
	when,
	fallback = null,
	children,
}: ConditionRenderProps) => {
	return when ? <>{children}</> : fallback;
};
