import React, {useEffect, useState} from "react";
import {changeUserComponentName, resetErrorName} from "../../../store/componentNameForm/actions";
import {connect} from "react-redux";


function ComponentNameForm(props) {
    const [currentComponent, setCurrentComponent] = useState("");
    useEffect(() => {
        const {userComponentName, componentName, userComponentsList} = props;
        let component;
        // if it is a user's component take the unique id
        if (userComponentName !== "") {
            component = userComponentName + userComponentsList[userComponentName];
        } else {
            component = componentName;
        }
        setCurrentComponent(component);
    }, [props.userComponentName, props.componentName]);


    const [inputComponentName, setInputComponentName] = useState("");
    useEffect(() => {
        if (currentComponent !== "") {
            props.changeUserComponentName(currentComponent, inputComponentName);
        }
        props.resetErrorName();
    }, [inputComponentName]);


    useEffect(() => {
        const names = props.namesForComponents;
        if (names[currentComponent] !== undefined) {
            setInputComponentName(names[currentComponent]);
        } else {
            setInputComponentName("");

            if (currentComponent !== "") {
                props.changeUserComponentName(currentComponent, "");
            }
        }
        props.resetErrorName();
    }, [currentComponent]);

    let errorText, errorClass = "";
    if (props.error !== "") {
        errorClass = " form__input_error";
        errorText = <p className="form__error_text">{props.error}</p>;
    }

    return (
        <form className="form">
            <label className="form__label">Component Name</label>
            <div className="form__wrapper form__wrapper_long">
                <input type="text"
                       name={currentComponent}
                       onChange={(e) => {setInputComponentName(e.target.value)}}
                       value={inputComponentName}
                       placeholder="Name"
                       className={"form__input" + errorClass}
                />
                {errorText}
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.userComponentName.errorText,
        namesForComponents: state.userComponentName.namesForComponents,
        userComponentsList: state.currentComponent.userComponents,
        componentName: state.currentComponent.componentName,
        userComponentName: state.currentComponent.userComponentName
    }
}

const mapDispatchToProps = {
    changeUserComponentName,
    resetErrorName
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentNameForm);