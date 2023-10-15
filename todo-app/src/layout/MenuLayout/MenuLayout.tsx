import { Outlet } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Header from '../../components/Header/Header';
import JournalList from '../../components/JurnalList/JurnalList';

export function MenuLayout() {
	return (
		<div className={styles['app']}>
			<div className={styles['left-panel']}>
				<Header />
				<JournalList></JournalList>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default MenuLayout;
