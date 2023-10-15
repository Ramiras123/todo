import styles from './CardButton.module.css';
import cn from 'classnames';
import { CardButtonProps } from './CardButton.props';

function CardButton({ children, className, ...props }: CardButtonProps) {
	const cl = cn(styles['card-button'], {
		[`${className}`]: className
	});
	return (
		<button {...props} className={cl}>
			{children}
		</button>
	);
}

export default CardButton;
