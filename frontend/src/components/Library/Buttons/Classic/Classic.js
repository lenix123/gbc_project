import React, {Component} from 'react';
import "./Classic.css"
import StyleReader from "../../../../utils/StyleReader";
import {connect} from "react-redux";

class Classic extends Component {
    render() {
        const {isUserComponent, userComponentName} = this.props;
        let componentStates, componentStyles;

        if (isUserComponent) {
            componentStates = this.props.userLibrary;
            componentStyles = componentStates && componentStates[userComponentName];
        } else {
            componentStates = this.props.componentsStates;
            componentStyles = componentStates && componentStates.Classic;
        }

        const text = componentStyles.text || "Scooby Doo";
        const styleReader = new StyleReader(componentStyles);

        return (
            <button className={this.props.className + " classic-btn"}
                    style={styleReader.style}
                    onClick={ e => this.handleClick(e) }>
                {text}
            </button>
        )
    }

    handleClick(e) {
        e.preventDefault();
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