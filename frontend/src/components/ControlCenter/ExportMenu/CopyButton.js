import React from "react";
import "../../../assets/css/ControlCenter/Instruction.scss";

// кнопка CopyButton копирует переданный текст в буфер обмена
class CopyButton extends React.Component {
    state = {
        textButton: "Copy",
        isDisabled: false
    }

    render() {
        return (
            <button disabled={this.state.isDisabled}
                    onClick={this.copyToClipboard}
                    className={"instruction__button"}>
                {this.state.textButton}
            </button>
        );
    }

    // функция copyToClipboard() копирует текст в буфер обмена
    copyToClipboard = () => {
        let text = this.props.text;
        // создаём текстовое поле и записываем туда text
        let el = document.createElement('textarea');
        el.value = text;
        // добавляем текстовое поле в DOM
        document.body.appendChild(el);
        // выделяем и копируем текст
        el.select();
        document.execCommand('copy');
        // удаляем текстовое поле из DOM
        document.body.removeChild(el);

        // меняем состояние кнопки
        this.setState({
            textButton: "Copied",
            isDisabled: true
        })

        setTimeout(this.backCopy, 1000)
    }

    // функция backCopy() возвращает кнопку в исходное состояние
    backCopy = () => {
        this.setState({
            textButton: "Copy",
            isDisabled: false
        })
    }
}

export default CopyButton;