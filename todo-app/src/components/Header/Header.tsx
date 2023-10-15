import style from './Header.module.css';

function Header() {
	return (
		<>
			<img className={style.logo} src={'/logo.svg'} alt="Логотип проекта" />
		</>
	);
}

export default Header;
