import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input/Input';
import Button from '../../components/Button/Button';
import styles from './Menu.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CartItem } from '../../interface/cart.interface';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

const InitState: CartItem = {
	title: '',
	text: '',
	date: '',
	id: -1
};

export function Menu() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [value, setValue] = useState<CartItem>(InitState);
	const items = useSelector((s: RootState) => s.cart.items);
	const cartItem = useParams<{ id: string }>();
	const addJournalItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			cartAction.add({
				id: items.length + 1,
				title: value.title,
				date: value.date,
				text: value.text
			})
		);
		navigate('/');
		setValue(InitState);
	};
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
					className={styles['input']}
				></textarea>
				<Button>Сохранить</Button>
			</form>
		</>
	);
}

export default Menu;
