import React, {Component} from "react";
import "./BankCard.css";
import StyleReader from "../../../../utils/StyleReader";
import Data from "../Data/Data";
import {connect} from "react-redux";

class BankCard extends Component {
    state = {
        value: '',
    }

    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["BankCard"];
        const styleReader = new StyleReader(componentStyle);
        const defaultText = componentStyle.text || 'Lenix Bank'
        let CardStyle = styleReader.style;
        CardStyle['background'] = CardStyle['background'];
        CardStyle['color'] = CardStyle['color'];

        return (
            <div className={"bankCard"} style={CardStyle}>
                <div className="bankCard__bankLogo">
                    <p>{defaultText}</p>
                </div>
                <div className="bankCard__number">
                    <Data className={"bankCard__number__form"}
                          id={"card-number"}
                          formMask={"9999-9999-9999-9999"}
                          formPlaceholder={"Card number"} />
                </div>
                <div className={"bankCard__lower"}>
                    <div className="bankCard__lower__forms">
                        <div className={"bankCard__period"}>
                            <Data className={"bankCard__month"}
                                  formMask={"99"}
                                  formPlaceholder={"MM"}/>
                            <p className={"bankCard__splitter"}>/</p>
                            <Data className={"bankCard__year"}
                                  formMask={"99"}
                                  formPlaceholder={"YY"}/>
                        </div>
                        <Data className={"bankCard__code"}
                              formMask={"999"}
                              formPlaceholder={"Code"}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(BankCard);