import React, {Component} from "react";
import "../Login.css"
import StyleReader from "../../../../../utils/StyleReader";
import {connect} from "react-redux";

class Password extends Component {
    state = {
        value: ""
    }

    render() {
        const {componentsState, componentWithSync} = this.props;
        const condition = this.state.value === '' ? '' : 'filled'

        let style, label, errorPasswordMessage;
        let errorClassName = "";

        if (this.props.isMute) {
            style = {};
            label = this.props.children || "Password";

            const errorText = this.props.errorText;
            if (errorText !== "" && errorText !== undefined) {
                errorClassName = " login__input_error";
                errorPasswordMessage = <div className="auth_error_text">{errorText}</div>;
            }
        } else {
            let componentStyle;

            if (componentWithSync) {
                componentStyle = componentsState && componentsState[componentWithSync];
            } else {
                componentStyle = componentsState && componentsState["Password"];
            }

            const styleReader = new StyleReader(componentStyle);
            style = styleReader.style

            label = componentStyle.text || "Password";
        }

        return (
            <div>
                <form className={"login__group"}>
                    <input type={"password"}
                           name={this.props.name}
                           onBlur={this.handleBlur}
                           onChange={this.handleChange}
                           className={"login__input" + errorClassName}
                           placeholder=""
                           value={this.state.value}
                           style={style}/>
                    <label className={`login__label login__label_${condition}`}>{label}</label>
                    {errorPasswordMessage}
                </form>
            </div>
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

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(Password);