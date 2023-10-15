import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input/Input';
import Button from '../../components/Button/Button';
import styles from './Menu.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { itemAction } from '../../store/item.slice';

export function Menu() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((s: RootState) => s.cart.items);
	const cartItem = useParams<{ id: string }>();
	const { item, validate, isReadySubmit } = useSelector(
		(s: RootState) => s.item
	);

	const addJournalItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			itemAction.updateValidate({
				title: item.title?.trim().length ? true : false,
				text: item.text?.trim().length ? true : false,
				date: item.date ? true : false
			})
		);
	};

	useEffect(() => {
		if (isReadySubmit) {
			if (item.date && item.title && item.text) {
				dispatch(
					cartAction.add({
						id: cartItem.id ? Number(cartItem.id) : items.length + 1,
						title: item.title,
						date: item.date,
						text: item.text
					})
				);
				dispatch(itemAction.clear());
				navigate('/');
			}
		}
	}, [isReadySubmit]);

	useEffect(() => {
		let timerValidState: number;
		if (!validate.title || !validate.text || !validate.date) {
			timerValidState = setTimeout(() => {
				dispatch(itemAction.clearValidate());
			}, 2000);
		}
		return () => {
			clearTimeout(timerValidState);
		};
	}, [validate]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const data = event.target;
		dispatch(itemAction.createCart({ [data.name]: data.value }));
	};
	useEffect(() => {
		const itemRes = items.find((item) => item.id === Number(cartItem.id));
		if (itemRes) {
			dispatch(itemAction.createCart(itemRes));
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
						value={item.title}
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
									dispatch(itemAction.clear());
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
							item.date ? new Date(item.date).toISOString().slice(0, 10) : ''
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
					value={item.text}
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
