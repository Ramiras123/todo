import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Input/Input';
import Button from '../../components/Button/Button';
import styles from './Menu.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { FormEvent, useEffect, useReducer, useRef } from 'react';
import { CartItem } from '../../interface/cart.interface';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { INITIAL_STATE, StateCart, formReduce } from './Menu.state';

export function Menu() {
	const [formState, dispatchForm] = useReducer(formReduce, INITIAL_STATE);
	const selectItem = useSelector((s: RootState) => s.cart.items);
	const { isValid, values, isFormReadyToSubmit } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { id } = useParams<{ id: string }>();
	// const focuseError = (isValid: IsValid) => {
	// 	switch (true) {
	// 		case !isValid.title:
	// 			titleRef.current.focus();
	// 			break;
	// 		case !isValid.date:
	// 			dateRef.current.focus();
	// 			break;
	// 		case !isValid.text:
	// 			textRef.current.focus();
	// 			break;
	// 	}
	// };

	useEffect(() => {
		if (!selectItem) {
			dispatchForm({ type:});
			dispatchForm({
				type: 'SET_VALUE',
				payload: { userId }
			});
		}
		dispatchForm({
			type: 'SET_VALUE',
			payload: { ...selectItem }
		});
	}, [selectItem, id]);

	useEffect(() => {
		let timerValidState: number;
		if (!isValid.title || !isValid.text || !isValid.date) {
			//	focuseError(isValid);
			timerValidState = setTimeout(
				() => dispatchForm({ type: 'RESET_VALIDITY' }),
				2000
			);
		}
		return () => {
			clearTimeout(timerValidState);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({
				type: 'SET_VALUE',
				payload: { userId }
			});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	const addJournalItem = (
		e: FormEvent<HTMLFormElement | HTMLTextAreaElement>
	) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};
	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value, id }
		});
	};

	useEffect(() => {
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({
			type: 'SET_VALUE',
			payload: { id }
		});
	}, [id]);

	const formdelete = () => {
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({
			type: 'SET_VALUE',
			payload: { id }
		});
	};
	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['form-row']}>
					<Input
						type="title"
						name="title"
						appearance="title"
						value={values.title}
						isValid={isValid.title}
						onChange={onChange}
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
						isValid={isValid.date}
						value={
							values.date
								? new Date(values.date).toISOString().slice(0, 10)
								: ''
						}
						onChange={onChange}
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
					className={cn(styles['input'], {
						[styles['invalid']]: !isValid.text
					})}
					value={values.text}
					onChange={onChange}
				></textarea>
				<Button>Сохранить</Button>
			</form>
		</>
	);
}

export default Menu;
