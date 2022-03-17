import React, {useEffect, useState} from "react";
import Password from "./Library/Forms/Authorization/Password/Password";
import Login from "./Library/Forms/Authorization/Login/Login";
import Classic from "./Library/Buttons/Classic/Classic";
import "../assets/css/Auth.css";
import {authLogin, resetError} from "../store/auth/actions";
import {connect} from "react-redux";
import { useNavigate, Link } from "react-router-dom";


function Signin(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        // reset the previous error
        setIsAuthFailed(false);
        setLoginErrorText("");
    }, [login]);


    useEffect(() => {
        setIsAuthFailed(false);
        setPassErrorText("");
    }, [password]);


    const navigate = useNavigate();
    const [isAuthFailed, setIsAuthFailed] = useState(false);
    useEffect(() => {
        if (props.isAuthenticated) {
            navigate("/");
        } else if (props.error !== null && props.error.response.status === 400) {
            setIsAuthFailed(true);
        }
        return () => {
            props.cleanError();
        }
    }, [props.isAuthenticated, props.error]);


    const [loginErrorText, setLoginErrorText] = useState("");
    const [passErrorText, setPassErrorText] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        if (login !== "" && password !== "") {
            props.onAuth(login, password);
        } else {
            const requiredField = "This is a required field";
            if (login === "") {
                setLoginErrorText(requiredField);
            }
            if (password === "") {
                setPassErrorText(requiredField);
            }
        }
    }


    const authFailedMessage = !isAuthFailed ? "" : <div className="auth-failed-message">
        email address or password are incorrect
    </div>;

    return(
        <div className="login-page" onKeyDown={e => handleKeyDown(e)}>
            <div className="entry" style={{marginTop: '15vh'}}>
                <h1 className="entry__title">Login</h1>
                <Login isMute={true} onChange={(e) => setLogin(e.target.value)} errorText={loginErrorText}>
                    Username or email
                </Login>
                <Password isMute={true} onChange={(e) => setPassword(e.target.value)} errorText={passErrorText} />
                {authFailedMessage}
                <div className="auth-links-container">
                    <form onSubmit={handleSubmit}>
                        <Classic isMute={true}>Log in</Classic>
                    </form>
                    or
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </div>
            </div>
        </div>
    )

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit(e);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password) => dispatch(authLogin(login, password)),
        cleanError: () => dispatch(resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);