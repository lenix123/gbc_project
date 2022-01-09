import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../../../../../utils/StyleReader";
import {connect} from "react-redux";

class Email extends Component {
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
            componentStyle = componentsState && componentsState["Email"];
        }

        const styleReader = new StyleReader(componentStyle);
        const label = componentStyle.text || "Email";

        return (
            <form className={styleReader.userClassName + "login__group"}>
                <input type={"email"}
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

export default connect(mapStateToProps)(Email);