import React, {Component} from "react";
import StyleReader from "../../../../utils/StyleReader";
import styled from "styled-components";
import "./Outline.css"
import {connect} from "react-redux";


class Outline extends Component {
    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["Outline"];
        const text = componentStyle.text || "Scooby Doo";
        const styleReader = new StyleReader(componentStyle);

        const mainColor = componentStyle['bc'] || "#0071f0";
        const Button = styled.button`
          background: none;
          border: ${mainColor} solid 3px;
          color: ${mainColor};
          &:hover {
            background: ${mainColor};
            color: ${componentStyle['clh'] || '#fff'};
          }
        `;

        return (
            <Button className={this.props.className + " outline-btn"}
                    style={styleReader.style}
                    onClick={ e => this.handleClick(e) }>
                {text}
            </Button>
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

export default connect(mapStateToProps)(Outline);