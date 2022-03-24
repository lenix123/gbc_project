import React, {Component} from 'react';
import "./Waves.css";
import StyleReader from "../../../../utils/StyleReader";


class Waves extends Component {
    render() {
        const {componentStyles} = this.props;
        const text = componentStyles.text || "Scooby Doo";

        const styleReader = new StyleReader(componentStyles);
        const style = styleReader.style;

        return (
            <button className={this.props.className + " buttonWaves"}
                    style={style}
                    onClick={ e => this.handleClick(e) }>
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

    handleClick(e) {
        e.preventDefault();
    }
}

export default Waves;