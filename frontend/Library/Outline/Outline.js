import React, {Component} from "react";
import "./Outline.css";
import StyleReader from "../StyleReader";
import styled from "styled-components";

class Outline extends Component {
    render() {
        const text = this.props.children || "Scooby Doo";
        const className = this.props.className || "";
        const styleReader = new StyleReader(className);

        const mainColor = styleReader.style.borderColor || "#0071f0";
        const Button = styled.button`
          background: none;
          border: ${mainColor} solid 3px;
          color: ${mainColor};
          &:hover {
            background: ${mainColor};
            color: ${styleReader._colorOnHover || '#fff'};
          }
        `;

        return (
            <Button className={styleReader.userClassName + " outline-btn"}
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

export default Outline;