import React, {Component} from "react";
import StyleReader from "../../../../utils/StyleReader";
import styled from "styled-components";
import "./Outline.css";


class Outline extends Component {
    render() {
        const {componentStyles} = this.props;
        const text = componentStyles.text || "Scooby Doo";

        const styleReader = new StyleReader(componentStyles);
        const style = styleReader.style;

        const mainColor = componentStyles['bc'] || "#0071f0";
        const Button = styled.button`
          background: none;
          border: ${mainColor} solid 3px;
          color: ${mainColor};
          &:hover {
            background: ${mainColor};
            color: ${componentStyles['clh'] || '#fff'};
          }
        `;

        return (
            <Button className={this.props.className + " outline-btn"}
                    style={style}
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