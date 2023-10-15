import styles from './Journalitem.module.css';
import { JournalItemProps } from './Journalitem.props';

function JournalItem({ title, date, text }: JournalItemProps) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);
	return (
		<div>
			<h1 className={styles['journal-item__header']}>{title}</h1>
			<div className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formatedDate}</div>
				<div className={styles['journal-item__text']}>{text}</div>
			</div>
		</div>
	);
}

export default JournalItem;
