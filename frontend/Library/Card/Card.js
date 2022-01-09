import React from "react";
import "./Card.css";
import img from "./product3.jpg";
import StyleReader from "../StyleReader";

class Card extends React.Component {
    render() {
        const className = this.props.className || "";
        const defaultStr = "Lorem ipsum dolor sit amet," +
                            " consectetur adipisicing elit." +
                            " Aperiam eligendi impedit molestiae nisi."
        let description;
        let Button;
        let children = this.props.children;

        if (typeof children === "object") {
            if (children.length === 2) {
                description = children[0];
                Button = children[1];
            } else {
                description = defaultStr;
                Button = children;
            }
        } else if (typeof children === "string") {
            description = children;
        }

        let styleReader = new StyleReader(className);
        let urlImg = this.props.src || img;

        return(
            <div className={styleReader.userClassName + "card"} style={styleReader.style}>
                <img className={"card__img"} src={urlImg} alt="Wrong URL address"/>
                <p className={"card__description"}>
                    {description}
                </p>
                {Button}
            </div>
        )
    }
}

export default Card;