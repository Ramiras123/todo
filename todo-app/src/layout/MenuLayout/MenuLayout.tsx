import { Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CardButton from '../../components/CardButton/CardButton';
import JournalItem from '../../components/Journalitem/Journalitem';

export function MenuLayout() {
	return (
		<>
			<div>
				Левая часть
				<Button>Выход</Button>
				<CardButton>
					<JournalItem title={'da'} date={new Date()} text={'das'} />
				</CardButton>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default MenuLayout;
