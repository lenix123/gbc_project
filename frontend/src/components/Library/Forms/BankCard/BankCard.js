import React, {Component} from "react";
import "./BankCard.css";
import StyleReader from "../../../../utils/StyleReader";
import Data from "../Data/Data";

class BankCard extends Component {
    state = {
        value: '',
    }

    render() {
        const {componentStyles, isUserComponent, componentsState} = this.props;
        const defaultText = componentStyles.text || 'Lenix Bank';
        const styleReader = new StyleReader(componentStyles);
        let CardStyle = styleReader.style;
        CardStyle['background'] = CardStyle['background'];
        CardStyle['color'] = CardStyle['color'];

        let dataStyle;
        if (isUserComponent) {
            dataStyle = componentStyles.dataStyle;
        } else {
            dataStyle = componentsState["Data"];
        }

        return (
            <div className={"bankCard"} style={CardStyle}>
                <div className="bankCard__bankLogo">
                    <p>{defaultText}</p>
                </div>
                <div className="bankCard__number">
                    <Data className={"bankCard__number__form"}
                          id={"card-number"}
                          formMask={"9999-9999-9999-9999"}
                          formPlaceholder={"Card number"}
                          componentStyles={dataStyle} />
                </div>
                <div className={"bankCard__lower"}>
                    <div className="bankCard__lower__forms">
                        <div className={"bankCard__period"}>
                            <Data className={"bankCard__month"}
                                  formMask={"99"}
                                  formPlaceholder={"MM"}
                                  componentStyles={dataStyle} />
                            <p className={"bankCard__splitter"}>/</p>
                            <Data className={"bankCard__year"}
                                  formMask={"99"}
                                  formPlaceholder={"YY"}
                                  componentStyles={dataStyle} />
                        </div>
                        <Data className={"bankCard__code"}
                              formMask={"999"}
                              formPlaceholder={"Code"}
                              componentStyles={dataStyle} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BankCard;