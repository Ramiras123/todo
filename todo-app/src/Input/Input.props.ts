import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	isValid?: boolean;
	appearance?: string;
}
