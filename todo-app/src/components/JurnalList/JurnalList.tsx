import styles from './JournalList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import JournalItem from '../Journalitem/Journalitem';
import CardButton from '../CardButton/CardButton';

function JournalList() {
	const items = useSelector((s: RootState) => s.cart.items);

	if (items.length === 0) {
		return (
			<div className={styles['journal-list']}>
				<p>Данных еще нет</p>
			</div>
		);
	}
	return (
		<div className={styles['journal-list']}>
			{items.map((item) => (
				<CardButton to={`cart/${item.id}`} key={item.id}>
					<JournalItem
						key={item.id}
						title={item.title}
						text={item.text}
						date={new Date(item.date)}
					></JournalItem>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;
