import React, {Component} from "react";
import '../../../assets/css/ControlCenter/ControlMenu.scss';
import CopyButton from "../ExportMenu/CopyButton";


class InfoMenu extends Component {
    render() {
        const npmText= "npm install --save styled-components";
        const yarnText = "yarn add styled-components";
        return (
            <div className={"control-menu"}>
                <div className="control-menu__inner">
                    <p>To work with this component, you need to install the "styled-components" package for React.js:</p>
                    <div className="control-menu__instruction">
                        <div className="control-menu__instruction__text">{npmText}</div>
                        <CopyButton text={npmText}/>
                    </div>
                    <p>If you are using yarn then install "styled-components" with the command:</p>
                    <div className="control-menu__instruction">
                        <div className="control-menu__instruction__text">{yarnText}</div>
                        <CopyButton text={yarnText}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoMenu;