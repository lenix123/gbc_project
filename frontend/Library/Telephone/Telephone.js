import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../StyleReader";
import mask from "../Phone/phoneMask";

class Telephone extends Component {
    state = {
        value: ""
    }

    render() {
        const className = this.props.className || "";
        const label = this.props.children || "Telephone";
        const styleReader = new StyleReader(className);

        return (
            <form className={styleReader.userClassName + "login__group"}>
                <input type={"text"}
                       id={"tel"}
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
        let input = document.querySelector("#tel");
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

        this.setState({
            value: event.target.value
        })
    }
}

export default Telephone;