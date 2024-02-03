import './Header.css';
import header__logo from "../../Images/icons/header__logo.svg";
import { Link } from 'react-router-dom';


export default function Header({ name, dataUser }) {
  console.log(dataUser)

  function onSignOut() {
    localStorage.removeItem('jwt')
  }

  return (
    <header className="header">
      <img 
        className="header__logo" 
        src={header__logo} 
        alt="Место. Логотип" 
      />
      <div className='header__wrapper'>
      {name === 'sign-up' || name === 'sign-in' ? 
        <Link to={name === 'sign-up' ? '/sign-in' : '/sign-up'} className='header__link'>
          { name !== 'sign-up' ? 'Регистрация' : 'Войти'} 
        </Link> : 
          <>
          <p className='header__email'>{dataUser}</p>
          <Link to='/sign-in' className='header__link header__sign-out' onClick={onSignOut}>Выйти</Link>
          </>
      }
      
      
      </div>
    </header>
  );
}
