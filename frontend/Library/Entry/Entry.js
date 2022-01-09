import React, {Component} from "react";
import "./Entry.css"
import StyleReader from "../StyleReader";

class Entry extends Component {
    render() {
        const className = this.props.className || "";
        let styleReader = new StyleReader(className);
        const children = this.props.children;
        let nameForm;
        let Inside;

        if (typeof children === "object") {
            if (children.length === 4) {
                nameForm = children[0];
                Inside = children.slice(1);
            } else {
                nameForm = "Sign in";
                Inside = children;
            }
        } else if (typeof children === "string") {
            nameForm = children;
        }

        return (
            <form className={styleReader.userClassName + " entry"}
                  style={styleReader.style}>
                <h1 className={"entry__title"}>{nameForm}</h1>
                {Inside}
            </form>
        )
    }
}

export default Entry;