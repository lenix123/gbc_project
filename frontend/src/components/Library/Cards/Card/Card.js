import React from "react";
import "./Card.css";
import defaultImg from "./product3.jpg";
import StyleReader from "../../../../utils/StyleReader";
import * as components from "../../../../utils/Hub";


class Card extends React.Component {
    render() {
        const {componentStyles, isUserComponent, componentsState} = this.props;
        const description = componentStyles.text || "Lorem ipsum dolor sit amet," +
                                                 " consectetur adipisicing elit." +
                                                 " Aperiam eligendi impedit molestiae nisi.";
        const styleReader = new StyleReader(componentStyles);
        const style = styleReader.style;
        const url = styleReader.url || defaultImg;

        let Button, btnStyles;
        if (isUserComponent && componentStyles.btn === "Initial") {
            Button = components[componentStyles.initialBtn];
            btnStyles = componentStyles["btnStyle"];
        } else {
            const buttonName = componentStyles.btn || 'Classic';
            Button = components[buttonName];
            btnStyles = componentsState[buttonName];
        }

        return(
            <div className={styleReader.userClassName + "card"} style={style}>
                <img className={"card__img"} src={url} alt="Wrong URL address"/>
                <p className={"card__description"}>
                    {description}
                </p>
                <Button componentStyles={btnStyles} className={'card__button'} />
            </div>
        )
    }
}

export default Card;