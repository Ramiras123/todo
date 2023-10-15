import styles from './CardButton.module.css';
import cn from 'classnames';
import { CardButtonProps } from './CardButton.props';
import { NavLink } from 'react-router-dom';

function CardButton({ children, className, ...props }: CardButtonProps) {
	const cl = cn(styles['card-button'], {
		[`${className}`]: className
	});
	return (
		<NavLink {...props} className={cl}>
			{children}
		</NavLink>
	);
}

export default CardButton;
