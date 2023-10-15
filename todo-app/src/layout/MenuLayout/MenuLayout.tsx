import { Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';

export function MenuLayout() {
	return (
		<>
			<div>
				Левая часть
				<Button>Выход</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default MenuLayout;
