import React, {Component} from 'react';
import "./Waves.css"
import StyleReader from "../StyleReader";

class Waves extends Component {
    render() {
        const className = this.props.className || "";
        let text = this.props.children || "Scooby Doo";
        let styleReader = new StyleReader(className);

        return (
            <button className={styleReader.userClassName + "buttonWaves"} style={styleReader.style}>
                <p>{text}</p>
                <span className={"buttonWaves__inner"}>
                    <span className={"buttonWaves__wave"}/>
                    <span className={"buttonWaves__wave"}/>
                    <span className={"buttonWaves__wave"}/>
                    <span className={"buttonWaves__wave"}/>
                </span>
            </button>
        );
    }
}

export default Waves;