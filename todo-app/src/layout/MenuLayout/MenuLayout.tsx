import { Outlet } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Header from '../../components/Header/Header';
import JournalList from '../../components/JurnalList/JurnalList';
import JournalAddButton from '../../components/JournalAddButton/JournalAddButton';

export function MenuLayout() {
	return (
		<div className={styles['app']}>
			<div className={styles['left-panel']}>
				<Header />
				<JournalAddButton></JournalAddButton>
				<JournalList></JournalList>
			</div>
			<div className={styles.body}>
				<Outlet />
			</div>
		</div>
	);
}

export default MenuLayout;
