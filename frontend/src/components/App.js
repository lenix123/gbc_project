import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/App.scss';
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import ThemeContext from "./ThemeControl/ThemeContext";
import Workspace from "./Workspace";
import {setAppTheme} from "../store/appTheme/actions";
import {setUserLibrary} from "../store/userLibrary/actions";
import {authCheckState, setOldToken} from "../store/auth/actions";
import {returnToDefaultStatus} from "../store/createBtn/actions";
import {resetNotification} from "../store/notifications/actions";
import {connect} from "react-redux";


// Компонент App несет в себе функцию отображения всего приложения в целом
function App(props) {
    const {theme, setAppTheme, setUserLibrary, token, isCreatedNewComponent, notifications} = props;
    const isAuthenticated = token !== null;

    const [userComponents, setUserComponents] = useState([]);

    // if we update the page storage will not preserve the token
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            props.setOldToken(token);
        }
    }, []);


    function getAllComponents() {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/"
        }).then(response => {
            const userComponents = response.data;
            setUserLibrary(userComponents);
            setUserComponents(userComponents);
        })
    }

    useEffect(() => {
        if (token !== null) {
            getAllComponents();
        } else {
            setUserLibrary([]);
            setUserComponents([]);
        }
    }, [token])

    useEffect(() => {
        if (isCreatedNewComponent) {
            getAllComponents();
            props.returnToDefaultStatus();
        }
    }, [isCreatedNewComponent])


    const [notification, setNotificationText] = useState({
        message: "",
        type: ""
    });
    useEffect(() => {
        if (notifications.errorMessage !== "" || notifications.successMessage !== "") {
            if (notifications.errorMessage !== "") {
                setNotificationText({
                    message: notifications.errorMessage,
                    type: "error"
                });
            } else if (notifications.successMessage !== "") {
                setNotificationText({
                    message: notifications.successMessage,
                    type: "success"
                });
            }
            const timer = setTimeout(() => {
                setNotificationText({
                    message: "",
                    type: ""
                });
                props.resetNotification();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notifications])

    const notificationMessage = notification.message !== "" ?
        <div className={"notification notification-" + notification.type}>{notification.message}</div> : "";

    return (
        <ThemeContext.Provider value={ { theme: theme, toggleTheme: setAppTheme } }>
            <main className={`app app_${theme}`}>
                {notificationMessage}
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
        token: state.auth.token,
        isCreatedNewComponent: state.createBtn.isCreatedNewComponent,
        notifications: state.notifications
    }
}

const mapDispatchToProps = {
    setAppTheme,
    setUserLibrary,
    authCheckState,
    setOldToken,
    returnToDefaultStatus,
    resetNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);