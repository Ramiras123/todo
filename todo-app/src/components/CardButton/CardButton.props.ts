import { ReactNode } from 'react';
import { NavLinkProps } from 'react-router-dom';

export interface CardButtonProps extends NavLinkProps {
	children: ReactNode;
	className?: string;
}
