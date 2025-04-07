import { ReactNode } from 'react';
import { CardBody, CardContainer, CardFooter, CardHeader } from './card.styles';

const Card = ({ children }: { children: ReactNode }) => {
	return <CardContainer>{children}</CardContainer>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
