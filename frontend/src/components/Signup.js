import React, {useEffect, useState} from "react";
import Login from "./Library/Forms/Authorization/Login/Login";
import Email from "./Library/Forms/Authorization/Email/Email";
import Password from "./Library/Forms/Authorization/Password/Password";
import Classic from "./Library/Buttons/Classic/Classic";
import "../assets/css/Auth.css";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authSignup, resetError} from "../store/auth/actions";
import {emailValid, passwordsValid, matchPassValid} from "../utils/authValidation";


function Signup(props) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


    // after focus has left we will check this field
    const [subscribedFields, setSubscribeField] = useState([]);
    function handleBlur(e) {
        if (!subscribedFields.includes(e.target.name)) {
            setSubscribeField(subscribedFields + e.target.name);
        }
    }

    const [nameErrorText, setNameErrorText] = useState("");
    useEffect(() => {
        if (subscribedFields.includes("username") && userName === "") {
            setNameErrorText("This is a required field")
        } else {
            // reset name error
            setNameErrorText("")
        }
    }, [userName, subscribedFields]);

    const [emailErrorText, setEmailErrorText] = useState("");
    useEffect(() => {
        if (subscribedFields.includes("email")) {
            const errorText = emailValid(email);
            setEmailErrorText(errorText);
        }
    }, [email, subscribedFields]);

    const [pass1ErrorText, setPass1ErrorText] = useState("");
    useEffect(() => {
        if (subscribedFields.includes("password1")) {
            const errorText = passwordsValid(password1);
            setPass1ErrorText(errorText);
        }
    }, [password1, subscribedFields]);

    const [pass2ErrorText, setPass2ErrorText] = useState("");
    useEffect(() => {
        if (subscribedFields.includes("password2")) {
            const errorText = matchPassValid(password1, password2);
            setPass2ErrorText(errorText);
        }
    }, [password2, subscribedFields]);


    const navigate = useNavigate();
    useEffect(() => {
        const error = props.error;
        if (props.isAuthenticated) {
            navigate("/");
        } else if (error !== null && error.response.status === 400) {
            const errors = JSON.parse(error.request.response)

            for (let field of Object.keys(errors)) {
                // take just the first error
                const errorMessage = errors[field][0];
                switch (field) {
                    case "username":
                        setNameErrorText(errorMessage);
                        break;
                    case "email":
                        setEmailErrorText(errorMessage);
                        break;
                    case "password1":
                        setPass1ErrorText(errorMessage);
                        break;
                    case "password2":
                        setPass2ErrorText(errorMessage)
                        break;
                    default:
                        break;
                }
            }
        }

        return () => {
            props.cleanError();
        }
    }, [props.isAuthenticated, props.error]);


    function handleSubmit(e) {
        e.preventDefault();
        if (userName !== "" && emailValid(email) === "" && passwordsValid(password1) === "" && password1 === password2) {
            props.onAuth(userName, email, password1, password2);
        } else {
            const requiredField = "This is a required field";
            if (userName === "") {
                setNameErrorText(requiredField);
            }
            if (email === "") {
                setEmailErrorText(requiredField);
            }
            if (password1 === "") {
                setPass1ErrorText(requiredField);
            }
            if (password2 === "") {
                setPass2ErrorText(requiredField);
            }
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return(
        <div className="login-page" onKeyDown={e => handleKeyDown(e)}>
            <div className="entry" style={{marginTop: '15vh'}}>
                <h1 className="entry__title">Sign up</h1>
                <Login isMute={true} onChange={(e) => setUserName(e.target.value)} errorText={nameErrorText} name={"username"} onBlur={handleBlur}>
                    Username
                </Login>
                <Email isMute={true} onChange={(e) => setEmail(e.target.value)} errorText={emailErrorText} name={"email"} onBlur={handleBlur}/>
                <Password isMute={true} onChange={(e) => setPassword1(e.target.value)} errorText={pass1ErrorText} name={"password1"} onBlur={handleBlur}/>
                <Password isMute={true} onChange={(e) => setPassword2(e.target.value)} errorText={pass2ErrorText} name={"password2"} onBlur={handleBlur}>
                    Confirm password
                </Password>
                <form onSubmit={handleSubmit}>
                    <Classic isMute={true}>Sign up</Classic>
                </form>
            </div>
        </div>
    )
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
        onAuth: (username, email, password1, password2) => dispatch(authSignup(username, email, password1, password2)),
        cleanError: () => dispatch(resetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);