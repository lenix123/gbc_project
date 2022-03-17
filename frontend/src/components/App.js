import React, { useState, useEffect } from "react";
import '../assets/css/App.scss';
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import ThemeContext from "./ThemeControl/ThemeContext";
import Workspace from "./Workspace";
import {connect} from "react-redux";
import axios from "axios";
import {setAppTheme} from "../store/appTheme/actions";
import {setUserLibrary} from "../store/userLibrary/actions";
import {authCheckState} from "../store/auth/actions";


// Компонент App несет в себе функцию отображения всего приложения в целом
function App(props) {
    const {theme, setAppTheme, setUserLibrary, isAuthenticated} = props;

    const [userComponents, setUserComponents] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/"
        }).then(response => {
            const userComponents = response.data;
            setUserLibrary(userComponents);
            setUserComponents(userComponents);
        })
    }, [setUserComponents])

    return (
        <ThemeContext.Provider value={ { theme: theme, toggleTheme: setAppTheme } }>
            <main className={`app app_${theme}`}>
                <section className="app__menu">
                    <Header isAuthenticated={isAuthenticated} theme={theme}/>
                    <Sidebar userComponents={userComponents} isAuthenticated={isAuthenticated}/>
                </section>
                <Workspace/>
            </main>
        </ThemeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.appTheme.theme,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = {
    setAppTheme,
    setUserLibrary,
    authCheckState,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);