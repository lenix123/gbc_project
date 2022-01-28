import React, { Component } from 'react';
import {setComponentState} from "../../../../../store/libraryState/actions";
import {setUserComponentStyle} from "../../../../../store/userLibrary/actions";
import {connect} from "react-redux";


class TextForm extends Component {
    state = {
        value: '',
    }

    // метод жизненного цикла, позволяющий синхронизировать состояние формы со стилем компонента
    static getDerivedStateFromProps(props, state) {
        const {styleType, isUserComponent, componentName, userComponentName} = props;

        let componentStates, componentStyles;

        if (isUserComponent) {
            componentStates = props.userLibrary;
            componentStyles = componentStates && componentStates[userComponentName];
        } else {
            componentStates = props.componentsStates;
            componentStyles = componentStates && componentStates[componentName];
        }

        // синхронизация значения формы и стиля компонента
        if (componentStyles[styleType] !== state.value) {
            return { value: componentStyles[styleType] }
        }

        // в ином случае оставить без изменений
        return null;
    }

    render () {
        const {label} = this.props;

        return (
            <form className="form">
                <label className="form__label">{label}</label>
                <div className="form__wrapper form__wrapper_long">
                    <textarea className="form__textarea"
                              value={this.state.value}
                              onChange={this.handleChange}>
                    </textarea>
                </div>
            </form>
        )
    }

    // метод передает изменения с помощью функции-колбэка
    handleChange = (event) => {
        const {setComponentState, setUserComponentStyle, styleType, componentName, isUserComponent, userComponentName} = this.props;
        const value = event.target.value;

        if (isUserComponent) {
            setUserComponentStyle(userComponentName, styleType, value);
        } else {
            setComponentState(componentName, styleType, value);
        }

        this.setState({
            value: value,
        })
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        componentsStates: state.libraryState,
        isUserComponent: state.currentComponent.isUserComponent,
        userComponentName: state.currentComponent.userComponentName,
        userLibrary: state.userLibrary,
    }
}

const mapDispatchToProps = {
    setComponentState,
    setUserComponentStyle,
}


export default connect(mapStateToProps, mapDispatchToProps)(TextForm);
