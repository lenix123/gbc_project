import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../../../../../utils/StyleReader";

class Email extends Component {
    state = {
        value: ""
    }

    render() {
        const {componentStyles} = this.props;
        const condition = this.state.value === '' ? '' : 'filled';

        let style, label, errorEmailMessage;
        let errorClassName = "";

        if (this.props.isMute) {
            style = {};
            label = this.props.children || "Email";

            const errorText = this.props.errorText;
            if (errorText !== "" && errorText !== undefined) {
                errorClassName = " login__input_error";
                errorEmailMessage = <div className="auth_error_text">{errorText}</div>;
            }
        } else {
            const styleReader = new StyleReader(componentStyles);
            style = styleReader.style;

            label = componentStyles.text || "Email";
        }

        return (
            <form className={"login__group"}>
                <input type={"email"}
                       name={this.props.name}
                       onBlur={this.handleBlur}
                       onChange={this.handleChange}
                       className={"login__input" + errorClassName}
                       placeholder=""
                       value={this.state.value}
                       style={style}/>
                <label className={`login__label login__label_${condition}`}>{label}</label>
                {errorEmailMessage}
            </form>
        )
    }

    handleBlur = (event) => {
        const onBlur = this.props.onBlur;
        if (onBlur) {
            onBlur(event);
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })

        const onChange = this.props.onChange;
        if (onChange) {
            onChange(event);
        }
    }
}

export default Email;