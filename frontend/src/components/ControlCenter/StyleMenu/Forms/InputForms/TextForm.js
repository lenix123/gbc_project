import React, { Component } from 'react';
import {setComponentState} from "../../../../../store/libraryState/actions";
import {connect} from "react-redux";

class TextForm extends Component {
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
        const {setComponentState, styleType, componentName} = this.props;
        const value = event.target.value;
        setComponentState(componentName, styleType, value);

        this.setState({
            value: value,
        })
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


export default connect(mapStateToProps, mapDispatchToProps)(TextForm);
