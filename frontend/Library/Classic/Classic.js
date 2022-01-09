import React, {Component} from 'react';
import "./Classic.css"
import StyleReader from "../StyleReader";

class Classic extends Component {
    render() {
        const text = this.props.children || "Scooby Doo";
        const className = this.props.className || "";
        const styleReader = new StyleReader(className);

        return (
            <button className={styleReader.userClassName + "classic-btn"}
                    style={styleReader.style}
                    onChange={ e => this.handleClick(e) }>
                {text}
            </button>
        )
    }

    handleClick(e) {
        e.preventDefault();
    }
}

export default Classic;