import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
function Button({ children, ...props }: ButtonProps) {
	return (
		<button className={cn(styles.button, styles.accent)} {...props}>
			{children}
		</button>
	);
}

export default Button;
