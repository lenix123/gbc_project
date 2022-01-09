import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../StyleReader";

class Email extends Component {
    state = {
        value: ""
    }

    render() {
        const className = this.props.className || "";
        const label = this.props.children || "Email";
        const styleReader = new StyleReader(className);

        return (
            <form className={styleReader.userClassName + "login__group"}>
                <input type={"email"}
                       onChange={this.handleChange}
                       className={"login__input"}
                       placeholder=""
                       value={this.state.value}
                       style={styleReader.style}/>
                <label className={"login__label"}>{label}</label>
            </form>
        )
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
}

export default Email;