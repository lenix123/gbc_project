import React, { Component } from 'react'
import '../assets/css/App.scss'
import Sidebar from "./AppMenu/Sidebar"
import Header from "./AppMenu/Header";
import ThemeContext from "./ThemeControl/ThemeContext";
import Workspace from "./Workspace";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../store/reducers";


const store = createStore(rootReducer);
// Компонент App несет в себе функцию отображения всего приложения в целом
class App extends Component {
    state = {
        theme: 'light',
    }

    render() {
        return (
            // Provider позволяет дочерним компонентам подписаться на изменения UI-темы,
            // передавая в качестве пропсов значение темы (theme) и колбэк toggleTheme
            <Provider store={store}>
                <ThemeContext.Provider value={ { theme: this.state.theme, toggleTheme: this.toggleTheme } }>
                    <main className={`app app_${this.state.theme}`}>
                        <section className="app__menu">
                            <Header />
                            <Sidebar />
                        </section>
                        <Workspace />
                    </main>
                </ThemeContext.Provider>
            </Provider>
        );
    }

    // функция toggleTheme устанавливает тему оформления приложения
    toggleTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light',
        });
    }
}

export default App;