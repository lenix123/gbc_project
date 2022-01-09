import React, { Component } from 'react';
import {ChromePicker} from "react-color";
import {setComponentState} from "../../../../../store/libraryState/actions";
import {connect} from "react-redux";

// форма выбора цвета
class ColorForm extends Component {
    constructor(props) {
        super(props);

        // isOpen: открыта ли цветовая палитра?
        // color: выбранный на палитре цвет
        this.state = {
            isOpen: false,
            color: '#ec9360',
        };

        // создание рефа, который прикрепится к палитре и к самой форме
        this.toggleContainer = React.createRef();
    }

    // метод, вызывающийся сразу после рендера компонента
    // обработчик событий дает возможность скрыть цветовую палитру при нажатии за её пределы
    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    // удаляем обработчик, объявленный выше
    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }
    
    // метод жизненного цикла, позволяющий сбросить значение формы,
    // а также синхронизировать состояние формы со стилем компонента
    static getDerivedStateFromProps(props, state) {
        const {componentsState, componentName, styleType} = props;
        const componentStyle = componentsState[componentName];

        // если стили были сброшены вручную (resetStyles), то форма примет значения по умолчанию,
        if (componentStyle[styleType] === '' &&
            state.color !== '#ec9360' &&
            !state.isOpen
           ) {
            return {
                isOpen: false,
                color: '#ec9360',
            }
        // синхронизация значения формы и стиля компонента
        } else if (componentStyle[styleType] !== state.color && componentStyle[styleType] !== '') {
            return {
                isOpen: state.isOpen,
                color: componentStyle[styleType]
            }
        }

        // в ином случае оставить без изменений
        return null;
    }

    // при нажатии на форму открывает или закрывает цветовую палитру
    onClickHandler = () => {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }

    // если нажатие произведено вне цветовой палитры, то она будет закрыта
    onClickOutsideHandler = (event) => {
        if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    render() {
        const {label} = this.props;
        // отображать или скрыть цветовую палитру
        const colorPicker = this.isOpen() && <ChromePicker color={ this.state.color }
                                                           onChange={ this.handleChange }
                                                           disableAlpha={true}/>;

        return (
            <form className="form">
                <label className="form__label">{label}</label>
                <div className="form__wrapper" ref={this.toggleContainer}>
                   <button className="form__color-btn"
                          type="button"
                          onClick={this.onClickHandler}>
                       <div style={{background: this.state.color}}/>
                       <p>{this.state.color}</p>
                    </button>

                    <div className="form__color-picker">
                        {colorPicker}
                    </div>
                </div>
            </form>
        );
    }

    // обрабатывает изменение цвета и с помощью колбэка передает эти изменения
    handleChange = (color) => {
        const {setComponentState, componentName, styleType} = this.props;
        setComponentState(componentName, styleType, color.hex);

        this.setState({
            color: color.hex
        })
    }

    isOpen = () => {
        return this.state.isOpen;
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorForm);
