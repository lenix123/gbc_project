import React, { useState, useEffect } from "react";
import '../assets/css/App.scss';
import Sidebar from "./AppMenu/Sidebar";
import Header from "./AppMenu/Header";
import ThemeContext from "./ThemeControl/ThemeContext";
import Workspace from "./Workspace";
import {connect} from "react-redux";
import axios from "axios";
import {setAppTheme} from "../store/appTheme/actions";




// Компонент App несет в себе функцию отображения всего приложения в целом
function App(props) {
    const {theme, setAppTheme} = props;

    const [userComponents, setUserComponents] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/"
        }).then(response => {
            const userComponents = response.data
            setUserComponents(userComponents)
        })
    }, [setUserComponents])


    return (
        <ThemeContext.Provider value={ { theme: theme, toggleTheme: setAppTheme } }>
            <main className={`app app_${theme}`}>
                <section className="app__menu">
                    <Header />
                    <Sidebar userComponents={userComponents}/>
                </section>
                <Workspace />
            </main>
        </ThemeContext.Provider>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.appTheme.theme,
    }
}

const mapDispatchToProps = {
    setAppTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(App);