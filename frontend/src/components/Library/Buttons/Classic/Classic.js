import React, {Component} from 'react';
import "./Classic.css"
import StyleReader from "../../../../utils/StyleReader";
import {connect} from "react-redux";

class Classic extends Component {
    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["Classic"];
        const text = componentStyle.text || "Scooby Doo";
        const styleReader = new StyleReader(componentStyle);

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
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(Classic);