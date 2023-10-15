import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input/Input';
import Button from '../../components/Button/Button';
import styles from './Menu.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { itemAction } from '../../store/item.slice';

const INIT_STATE_VALID = {
	title: true,
	text: true,
	date: true
};
const INIT_STATE_SUBMIT = false;
export function Menu() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [validate, setValidate] = useState(INIT_STATE_VALID);
	const [isSubmit, setIsSubmit] = useState<boolean>(INIT_STATE_SUBMIT);
	const items = useSelector((s: RootState) => s.cart.items);
	const cartItem = useParams<{ id: string }>();
	const itemCart = useSelector((s: RootState) => s.item.item);

	const addJournalItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidate({
			title: itemCart.title?.trim().length ? true : false,
			text: itemCart.text?.trim().length ? true : false,
			date: itemCart.date ? true : false
		});

		if (
			itemCart.title?.trim().length &&
			itemCart.text?.trim().length &&
			itemCart.date
		) {
			setIsSubmit(true);
		}
	};

	useEffect(() => {
		if (isSubmit) {
			if (itemCart.date && itemCart.title && itemCart.text) {
				dispatch(
					cartAction.add({
						id: cartItem.id ? Number(cartItem.id) : items.length + 1,
						title: itemCart.title,
						date: itemCart.date,
						text: itemCart.text
					})
				);
				navigate('/');
			}
		}
	}, [isSubmit]);

	useEffect(() => {
		//	setValue(InitState);
		dispatch(itemAction.clear());
		setIsSubmit(INIT_STATE_SUBMIT);
		setValidate(INIT_STATE_VALID);
	}, [navigate]);

	useEffect(() => {
		let timerValidState: number;
		if (!itemCart.title || !itemCart.text || !itemCart.date) {
			setIsSubmit(false);
			timerValidState = setTimeout(() => {
				setValidate(INIT_STATE_VALID);
			}, 2000);
		}
		return () => {
			clearTimeout(timerValidState);
		};
	}, [itemCart]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const data = event.target;
		dispatch(itemAction.createCart({ [data.name]: data.value }));
		// setValue((prevFormValues) => ({
		// 	...prevFormValues,
		// 	[data.name]: data.value
		// }));
		console.log(itemCart);
	};
	useEffect(() => {
		const item = items.find((item) => item.id === Number(cartItem.id));
		if (item) {
			//	setValue(item);
			dispatch(itemAction.createCart(item));
		}
	}, [cartItem, dispatch, items]);
	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['form-row']}>
					<Input
						type="title"
						name="title"
						appearance="title"
						value={itemCart.title}
						isValid={validate.title}
						onChange={handleChange}
					/>
					{cartItem?.id && (
						<button
							className={styles['btn-delete']}
							type="button"
							onClick={() => {
								if (cartItem.id) {
									dispatch(cartAction.delete(+cartItem.id));
									setIsSubmit(INIT_STATE_SUBMIT);
									setValidate(INIT_STATE_VALID);
									navigate('/');
								}
							}}
						>
							<img src="/delete.svg" alt="Кнопка удаления" />
						</button>
					)}
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
							itemCart.date
								? new Date(itemCart.date).toISOString().slice(0, 10)
								: ''
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
					value={itemCart.text}
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
