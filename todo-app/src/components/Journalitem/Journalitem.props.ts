import { HTMLAttributes } from 'react';

export interface JournalItemProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	date: Date;
	text: string;
}
