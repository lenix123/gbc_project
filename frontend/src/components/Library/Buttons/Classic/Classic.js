import React, {Component} from 'react';
import "./Classic.css"
import StyleReader from "../../../../utils/StyleReader";
import {connect} from "react-redux";

class Classic extends Component {
    render() {
        const {isUserComponent, userComponentName} = this.props;

        let text, style;

        if (this.props.isMute) {
            text = this.props.children || "Submit";
            style = {};
        } else {
            let componentStates, componentStyles;

            if (isUserComponent) {
                componentStates = this.props.userLibrary;
                componentStyles = componentStates && componentStates[userComponentName];
            } else {
                componentStates = this.props.componentsStates;
                componentStyles = componentStates && componentStates.Classic;
            }

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

const mapStateToProps = (state) => {
    return {
        componentsStates: state.libraryState,
        isUserComponent: state.currentComponent.isUserComponent,
        userComponentName: state.currentComponent.userComponentName,
        userLibrary: state.userLibrary,
    }
}

export default connect(mapStateToProps)(Classic);