import React, { Component } from 'react';
import {setComponentState} from "../../../../../store/libraryState/actions";
import {connect} from "react-redux";

class NumberForm extends Component {
    state = {
        value: '',
    }

    // метод жизненного цикла, позволяющий синхронизировать состояние формы со стилем компонента
    static getDerivedStateFromProps(props, state) {
        const {componentsState, componentName, styleType} = props;
        const componentStyle = componentsState[componentName];

        // синхронизация значения формы и стиля компонента
        if (componentStyle[styleType] !== state.value) {
            return { value: componentStyle[styleType] }
        }

        // в ином случае оставить без изменений
        return null;
    }

    render () {
        const {label, styleType} = this.props;
        let minValue, placeholderValue = 0;

        // минимальное значение ширины компонента должно быть не меньше 80px
        if (styleType === 'wd') {
            placeholderValue = 80;
            minValue = 80;
        }

        return (
            <form className="form">
                <label className="form__label">{label}</label>
                <div className="form__wrapper">
                    <input className="form__number"
                           type="number"
                           min={minValue}
                           placeholder={placeholderValue}
                           value={this.state.value}
                           onChange={this.handleChange}>
                    </input>
                </div>
            </form>
        )
    }

    // метод передает изменения с помощью функции-колбэка
    handleChange = (event) => {
        const {setComponentState, componentName, styleType} = this.props;
        const value = event.target.value;
        setComponentState(componentName, styleType, value);

        this.setState({
            value: value,
        });
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        componentsState: state.libraryState
    }
}

const mapDispatchToProps = {
    setComponentState
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberForm);
