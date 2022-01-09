import React, {Component} from "react";
import "./Entry.css"
import StyleReader from "../../../../utils/StyleReader";
import * as components from "../../../../utils/Hub";
import {connect} from "react-redux";

class Entry extends Component {
    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["Entry"];
        const formType = componentStyle.type || "Email";
        const Authorization = components[formType];
        const Password = components["Password"];

        const styleReader = new StyleReader(componentStyle);
        const entryName = componentStyle.text || "Sign in";

        const buttonName = componentStyle.btn || "Classic";
        const buttonText = componentsState[buttonName].text;
        const Button = components[buttonName];

        const sync = componentStyle.sync || "None";
        let componentWithSync;

        if (sync === "Login") {
            componentWithSync = formType;
        } else if (sync === "Pass") {
            componentWithSync = "Password";
        }

        return (
            <div className={styleReader.userClassName + " entry"}
                  style={styleReader.style}>
                <h1 className={"entry__title"}>{entryName}</h1>
                <Authorization componentsState={componentsState}
                               componentWithSync={componentWithSync}/>
                <Password componentsState={componentsState}
                          componentWithSync={componentWithSync}/>
                <Button componentsState={componentsState}>
                    {buttonText}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(Entry);