import Logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onLogout }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Логотип Mesto Russia" />
      {location.pathname === "/signin" && (
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__email-holder">
          <p className="header__email">{email}</p>
          <Link
            className="header__link header__link_dark"
            onClick={() => onLogout()}
            to="/signin"
          >
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
