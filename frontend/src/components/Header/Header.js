import React, {Fragment} from 'react';
import '../../assets/css/App-menu/Header.scss';
import '../../assets/css/Auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../ThemeControl/ThemeSwitcher";
import {Link} from "react-router-dom";
import { logout } from "../../store/auth/actions";
import {connect} from "react-redux";

// Header - панель в верхнем левом углу веб-приложения
function Header(props) {
    // импортированная иконка-логотип присваивается переменной
    const headerLogo = <FontAwesomeIcon className="header__logo" icon={faLaptopCode}/>
    const theme = props.theme;

    let authMenu;

    if (props.isAuthenticated) {
        authMenu =
            <Link to="/" className={`auth-link auth-link-${theme}`} onClick={props.onLogout}>Log out</Link>
        ;
    } else {
        authMenu =
            <Fragment>
                <Link to="login" className={`auth-link auth-link-${theme}`}>Login</Link>
                <Link to="signup" className={`auth-link auth-link-${theme}`}>Sign up</Link>
            </Fragment>;
    }

    // отрисовывается лого, название приложения и тумблер переключения UI-темы
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    {headerLogo}
                    <p className="header__title">GBC</p>
                    {authMenu}
                    <ThemeSwitcher/>
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}


export default connect(null, mapDispatchToProps)(Header);