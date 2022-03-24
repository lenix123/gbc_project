import React, {Component} from "react";
import "./Entry.css"
import StyleReader from "../../../../utils/StyleReader";
import * as components from "../../../../utils/Hub";


class Entry extends Component {
    render() {
        const {componentStyles, isUserComponent, componentsState} = this.props;
        const Password = components["Password"];

        const styleReader = new StyleReader(componentStyles);
        const style = styleReader.style;
        const entryName = componentStyles.text || "Sign in";

        let Button, btnStyles;
        if (isUserComponent && componentStyles.btn === "Initial") {
            Button = components[componentStyles.initialBtn];
            btnStyles = componentStyles["btnStyle"];
        } else {
            const buttonName = componentStyles.btn || 'Classic';
            Button = components[buttonName];
            btnStyles = componentsState[buttonName];
        }

        let Login, loginFormStyles, passFormStyles, loginType;
        if (isUserComponent && componentStyles.type === "Initial") {
            loginType = componentStyles.initialLogin;
            Login = components[loginType];
            loginFormStyles = componentStyles.loginStyle;
            passFormStyles = componentStyles.passStyle;
        } else {
            loginType = componentStyles.type || "Email";
            Login = components[loginType];
            loginFormStyles = componentsState[loginType];
            if (isUserComponent) {
                passFormStyles = componentStyles.passStyle;
            } else {
                passFormStyles = componentsState["Password"];
            }
        }

        const sync = componentStyles.sync;
        if (sync === "Login") {
            passFormStyles = loginFormStyles;
        } else if (sync === "Pass") {
            loginFormStyles = passFormStyles;
        }

        return (
            <div className={"entry"}
                  style={style}>
                <h1 className={"entry__title"}>{entryName}</h1>
                <Login componentStyles={loginFormStyles} />
                <Password componentStyles={passFormStyles} />
                <Button componentStyles={btnStyles} />
            </div>
        )
    }
}

export default Entry;