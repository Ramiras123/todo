import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input/Input';
import Button from '../../components/Button/Button';
import styles from './Menu.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CartItem } from '../../interface/cart.interface';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

const InitState: CartItem = {
	title: '',
	text: '',
	date: '',
	id: -1
};
const INIT_STATE_VALID = {
	title: true,
	text: true,
	date: true
};
const INIT_STATE_SUBMIT = false;
export function Menu() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [value, setValue] = useState<CartItem>(InitState);
	const [validate, setValidate] = useState(INIT_STATE_VALID);
	const [isSubmit, setIsSubmit] = useState<boolean>(INIT_STATE_SUBMIT);
	const items = useSelector((s: RootState) => s.cart.items);
	const cartItem = useParams<{ id: string }>();
	const addJournalItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidate({
			title: value.title?.trim().length ? true : false,
			text: value.text?.trim().length ? true : false,
			date: value.date ? true : false
		});

		if (value.title?.trim().length && value.text?.trim().length && value.date) {
			setIsSubmit(true);
		}
	};

	useEffect(() => {
		if (isSubmit) {
			dispatch(
				cartAction.add({
					id: cartItem.id ? Number(cartItem.id) : items.length + 1,
					title: value.title,
					date: value.date,
					text: value.text
				})
			);
			navigate('/');
		}
	}, [isSubmit]);

	useEffect(() => {
		setValue(InitState);
		setIsSubmit(INIT_STATE_SUBMIT);
		setValidate(INIT_STATE_VALID);
	}, [navigate]);

	useEffect(() => {
		let timerValidState: number;
		if (!validate.title || !validate.text || !validate.date) {
			setIsSubmit(false);
			timerValidState = setTimeout(() => {
				setValidate(INIT_STATE_VALID);
			}, 2000);
		}
		return () => {
			clearTimeout(timerValidState);
		};
	}, [validate]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setValue((prevFormValues) => ({
			...prevFormValues,
			[name]: value
		}));
	};
	useEffect(() => {
		const item = items.find((item) => item.id === Number(cartItem.id));
		if (item) {
			setValue(item);
		}
	}, [cartItem, items]);
	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['form-row']}>
					<Input
						type="title"
						name="title"
						appearance="title"
						value={value.title}
						isValid={validate.title}
						onChange={handleChange}
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="/date.svg" alt="" />
						<span>Дата</span>
					</label>
					<Input
						type="date"
						name="date"
						id="date"
						isValid={validate.date}
						value={
							value.date ? new Date(value.date).toISOString().slice(0, 10) : ''
						}
						onChange={handleChange}
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="tag" className={styles['form-label']}>
						<img src="/folder.svg" alt="" />
						<span>Метки</span>
					</label>
					<Input type="text" id="tag" name="tag" />
				</div>
				<textarea
					name="text"
					id=""
					cols={30}
					rows={10}
					value={value.text}
					onChange={handleChange}
					className={cn(styles['input'], {
						[styles['invalid']]: !validate.text
					})}
				></textarea>
				<Button>Сохранить</Button>
			</form>
		</>
	);
}

export default Menu;
