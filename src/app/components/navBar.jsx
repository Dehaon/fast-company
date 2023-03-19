import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-start">
      <Link className="nav-link" to="/">
        Главная
      </Link>
      <Link className="nav-link" to="/login">
        Войти
      </Link>
      <Link className="nav-link" to="/users">
        Пользователи
      </Link>
    </nav>
  );
};

export default NavBar;
