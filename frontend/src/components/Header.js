import logo from '../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header ({email}) {
  const navigate = useNavigate();

  function onLogout () {
    localStorage.removeItem('jwt')
    navigate('/sign-in')
  }
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="Место"/>
        {window.location.pathname === "/" ?
        (
          <div className='header__status'>
            <p className='header__email'>{email}</p>
            <Link onClick={onLogout} to="/sign-in" className='header__status-button'>Выйти</Link>
          </div>
        ) : <Link className='header__status-button' to={window.location.pathname === "/sign-up" ? '/sign-in' : '/sign-up'}>{window.location.pathname === "/sign-up" ? 'Войти' : 'Регистрация'}</Link>}
    </header>
  )
}