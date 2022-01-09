import React from 'react'
import '../../assets/css/App-menu/Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons"
import ThemeSwitcher from "../ThemeControl/ThemeSwitcher"

// Header - панель в верхнем левом углу веб-приложения
function Header() {
    // импортированная иконка-логотип присваивается переменной
    const headerLogo = <FontAwesomeIcon className="header__logo" icon={faLaptopCode}/>

    // отрисовывается лого, название приложения и тумблер переключения UI-темы
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    {headerLogo}
                    <p className="header__title">GBC</p>
                    <ThemeSwitcher/>
                </div>
            </div>
        </header>
    )
}

export default Header