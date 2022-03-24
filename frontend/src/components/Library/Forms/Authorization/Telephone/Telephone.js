import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../../../../../utils/StyleReader";
import {phoneinput} from "./phoneinput";
import {phoneKeyDown} from "./phoneinput";
import {phonePaste} from "./phoneinput";


class Telephone extends Component {
    state = {
        value: ""
    }

    render() {
        const {componentStyles} = this.props;
        const condition = this.state.value === '' ? '' : 'filled';

        let style, label;

        const styleReader = new StyleReader(componentStyles);
        style = styleReader.style

        label = componentStyles.text || "Telephone";

        return (
            <form className={"login__group"}>
                <input type="tel"
                       id={"data-tel-input"}
                       className={"login__input"}
                       style={style}
                       placeholder=''
                       onChange={this.handleChange}
                       onPaste={this.onPhonePaste}
                       onKeyDown={this.onPhoneKeyDown}
                       value={this.state.value}
                       maxLength={18} />
                <label className={`login__label login__label_${condition}`}>{label}</label>
            </form>
        )
    }

    handleChange = (event) => {
        phoneinput(event);
        this.setState({
            value: event.target.value
        })
    }

    onPhoneKeyDown = (event) => {
        phoneKeyDown(event);
        this.setState({
            value: event.target.value
        })
    }

    onPhonePaste = (event) => {
        phonePaste(event);
        this.setState({
            value: event.target.value
        })
    }
}

export default Telephone;