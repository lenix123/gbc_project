import React from 'react'
import ThemeContext from './ThemeContext'

// ThemeSwitcher - переключатель UI-темы
function ThemeSwitcher() {

    // получает из контекста метод toggleTheme и
    // с его помощью меняет тему приложения
    return (
        <ThemeContext.Consumer>
            { ( {toggleTheme} ) => (
                   <div className="header__switcher">
                    <input type="checkbox"
                           className="header__toggle-btn"
                           onClick={toggleTheme}>
                    </input>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}


export default ThemeSwitcher