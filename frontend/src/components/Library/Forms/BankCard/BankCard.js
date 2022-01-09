import React, {Component} from "react";
import "./BankCard.css";
import StyleReader from "../../../../utils/StyleReader";
import Data from "../Data/Data";
import CardInfo from "card-info";
import * as nameLogos from "./BanksHub";
import * as nameBrands from "./BrandsHub";
import {connect} from "react-redux";

class BankCard extends Component {
    state = {
        bankName: '',
        bankLogo: '',
        brandLogo: '',
        background: '',
        textColor: '',
        codeName: 'CVV',
        nameLogo: '',
    }

    render() {
        const {componentsState} = this.props;
        const componentStyle = componentsState && componentsState["BankCard"];
        const styleReader = new StyleReader(componentStyle);
        const defaultText = componentStyle.text || 'Lenix Bank'
        let CardStyle = styleReader.style;
        CardStyle['background'] = this.state.background || CardStyle['background'];
        CardStyle['color'] = this.state.textColor || CardStyle['color'];

        let BankLogo;
        if (this.state.bankName === '') {
            BankLogo = <p>{this.state.bankName || defaultText}</p>;
        } else if (this.state.nameLogo !== '') {

            if (nameLogos[this.state.nameLogo] !== undefined) {
                BankLogo =  <img className="bankCard__img" src={nameLogos[this.state.nameLogo]} alt={this.state.bankName} />;
            } else {
                BankLogo = <p className="bankCard__bankName">{this.state.bankName}</p>;
            }

        }

        let BrandLogo;
        let pathToLogo = this.state.brandLogo;
        if (pathToLogo !== '') {
            let fileName = pathToLogo.split("/");
            fileName = fileName[fileName.length-1];
            let brandName = fileName.replaceAll('-', '_').replaceAll('.svg', '');
            BrandLogo = <img src={nameBrands[brandName]} alt="" />;
        }

        return (
            <div className={"bankCard"} style={CardStyle}>
                <div className="bankCard__bankLogo">
                    {BankLogo}
                </div>
                <div className="bankCard__number">
                    <Data className={"bankCard__number__form"}
                          id={"card-number"}
                          onChange={this.handleChange}
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
                              formPlaceholder={this.state.codeName}/>
                    </div>
                    <div className="bankCard__brandLogo">
                        {BrandLogo}
                    </div>
                </div>
            </div>
        );
    }

    handleChange = () => {
        let cardNum = document.querySelector("#card-number").value.trim();
        cardNum = cardNum.replace(/[-_]+/g, '');
        if (cardNum.length > 5) {
            let cardInfo = new CardInfo(cardNum, {
                banksLogosPath: '/node_modules/card-info/dist/banks-logos/',
                brandsLogosPath: '/node_modules/card-info/dist/brands-logos/'
            });

            if (cardInfo.bankName !== null) {
                this.setState({
                    bankName: cardInfo.bankName,
                    bankLogo: cardInfo.bankLogo,
                    brandLogo: cardInfo.brandLogo,
                    background: cardInfo.backgroundGradient,
                    textColor: cardInfo.textColor,
                    codeName: cardInfo.codeName,
                    nameLogo: cardInfo.bankAlias.replace('ru-', '').replace('24', ''),
                });
            }
        } else {
            this.setState({
                bankName: '',
                bankLogo: '',
                brandLogo: '',
                background: '',
                textColor: '',
                codeName: 'CVV',
                nameLogo: '',
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(BankCard);