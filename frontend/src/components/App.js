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
import {authCheckState, setOldToken} from "../store/auth/actions";


// Компонент App несет в себе функцию отображения всего приложения в целом
function App(props) {
    const {theme, setAppTheme, setUserLibrary, token} = props;
    const isAuthenticated = token !== null;

    const [userComponents, setUserComponents] = useState([]);

    // if we update the page storage will not preserve the token
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            props.setOldToken(token);
        }
    }, []);

    useEffect(() => {
        if (token !== null) {
            axios.defaults.headers.common['Authorization'] = `Token ${props.token}`;
            axios({
                method: "GET",
                url: "http://127.0.0.1:8000/api/"
            }).then(response => {
                const userComponents = response.data;
                setUserLibrary(userComponents);
                setUserComponents(userComponents);
            })
        }
    }, [props.token])

    return (
        <ThemeContext.Provider value={ { theme: theme, toggleTheme: setAppTheme } }>
            <main className={`app app_${theme}`}>
                <section className="app__menu">
                    <Header isAuthenticated={isAuthenticated} theme={theme}/>
                    <Sidebar userComponents={userComponents} isAuthenticated={isAuthenticated}/>
                </section>
                <Workspace />
            </main>
        </ThemeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.appTheme.theme,
        token: state.auth.token
    }
}

const mapDispatchToProps = {
    setAppTheme,
    setUserLibrary,
    authCheckState,
    setOldToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App);