import React from "react";
import * as components from "../utils/Hub";
import {connect} from "react-redux";


function ComponentCaller(props) {
    const {componentName, isUserComponent} = props;

    let componentsState, componentStyles;

    if (isUserComponent) {
        componentsState = props.userLibrary;
        componentStyles = componentsState && componentsState[props.userComponentName];
    } else {
        componentsState = props.componentsState;
        componentStyles = componentsState && componentsState[componentName];
    }

    const Component = components[componentName];
    const currentComponent = componentName && <Component componentStyles={componentStyles}
                                                         componentsState={props.componentsState}
                                                         isUserComponent={isUserComponent}/>;

    return (
        <div className="workspace__content">
            {currentComponent}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        componentsState: state.libraryState,
        isUserComponent: state.currentComponent.isUserComponent,
        userComponentName: state.currentComponent.userComponentName,
        userLibrary: state.userLibrary,
    }
}



export default connect(mapStateToProps)(ComponentCaller);