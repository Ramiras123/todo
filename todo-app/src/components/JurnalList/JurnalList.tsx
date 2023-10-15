import styles from './JournalList.module.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../Journalitem/Journalitem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
			<CardButton>
				{items.map((item) => (
					<JournalItem
						key={item.id}
						title={item.title}
						text={item.text}
						date={new Date(item.date)}
					></JournalItem>
				))}
			</CardButton>
		</div>
	);
}

export default JournalList;
