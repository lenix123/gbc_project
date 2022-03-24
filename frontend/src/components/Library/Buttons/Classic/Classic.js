import React, {Component} from 'react';
import "./Classic.css"
import StyleReader from "../../../../utils/StyleReader";


class Classic extends Component {
    render() {
        const {componentStyles} = this.props;

        let text, style;

        if (this.props.isMute) {
            text = this.props.children || "Submit";
            style = {};
        } else {
            text = componentStyles.text || "Scooby Doo";

            const styleReader = new StyleReader(componentStyles);
            style = styleReader.style;
        }

        return (
            <button className={this.props.className + " classic-btn"}
                    style={style}
                    onSubmit={this.props.onSubmit}>
                {text}
            </button>
        )
    }
}

export default Classic;