 import React from "react";
import "./Card.css";
import defaultImg from "./product3.jpg";
import StyleReader from "../../../../utils/StyleReader";
import * as components from "../../../../utils/Hub";
 import {connect} from "react-redux";

class Card extends React.Component {
    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["Card"];
        const description = componentStyle.text || "Lorem ipsum dolor sit amet," +
                                                 " consectetur adipisicing elit." +
                                                 " Aperiam eligendi impedit molestiae nisi.";
        const styleReader = new StyleReader(componentStyle);
        const url = styleReader.url || defaultImg;

        const buttonName = componentStyle.btn || 'Classic';
        const buttonText = componentsState[buttonName].text;
        const Button = components[buttonName];

        return(
            <div className={styleReader.userClassName + "card"} style={styleReader.style}>
                <img className={"card__img"} src={url} alt="Wrong URL address"/>
                <p className={"card__description"}>
                    {description}
                </p>
                <Button componentsState={componentsState} className={'card__button'}>
                    {buttonText}
                </Button>
            </div>
        )
    }
}

 const mapStateToProps = (state) => {
     return {
         componentsState: state.libraryState
     }
 }

export default connect(mapStateToProps)(Card);