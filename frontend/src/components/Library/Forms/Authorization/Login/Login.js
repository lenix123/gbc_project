import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../../../../../utils/StyleReader";
import {connect} from "react-redux";

class Login extends Component {
    state = {
        value: ""
    }

    render() {
        const {componentsState, componentWithSync} = this.props;
        const condition = this.state.value === '' ? '' : 'filled'
        let componentStyle;

        if (componentWithSync) {
            componentStyle = componentsState && componentsState[componentWithSync];
        } else {
            componentStyle = componentsState && componentsState["Login"];
        }

        const styleReader = new StyleReader(componentStyle);
        const label = componentStyle.text || "Login";

        return (
            <form className={styleReader.userClassName + "login__group"}>
                <input type={"text"}
                       onChange={this.handleChange}
                       className={"login__input"}
                       placeholder=""
                       value={this.state.value}
                       style={styleReader.style}/>
                <label className={`login__label login__label_${condition}`}>{label}</label>
            </form>
        )
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
}

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(Login);