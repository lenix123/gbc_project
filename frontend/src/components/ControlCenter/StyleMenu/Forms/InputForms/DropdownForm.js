import React, { Component } from 'react';
import {setComponentState} from "../../../../../store/libraryState/actions";
import {connect} from "react-redux";
import {setUserComponentStyle} from "../../../../../store/userLibrary/actions";

// форма - выпадающий список
class DropdownForm extends Component {
    // значение по умолчанию
    state = {
        value: 'Regular',
    }

    // метод жизненного цикла, позволяющий сбросить значение формы,
    // а также синхронизировать состояние формы со стилем компонента
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

        // если стили были сброшены вручную (resetStyles), то форма примет значения по умолчанию
        if (componentStyles[styleType] === '' && state.value !== 'Regular') {
            return { value: 'Regular' }
        // синхронизация значения формы и стиля компонента
        } else if (componentStyles[styleType] !== state.value && componentStyles[styleType] !== '') {
            return { value: componentStyles[styleType] }
        }

        // в ином случае оставить без изменений
        return null;
    }

    render () {
        const {label, elements} = this.props;

        // массив элементов выпадающего меню
        const optionList = elements.map((element, index) => {
           return <option value={element} key={index}>{element}</option>
        });

        return (
            <form className="form">
                <label className="form__label">{label}</label>
                <div className="form__wrapper">
                    <select className="form__dropdown"
                            value={this.state.value}
                            onChange={this.handleChange}>
                        {optionList}
                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownForm);
