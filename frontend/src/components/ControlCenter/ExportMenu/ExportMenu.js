import React, { Component } from 'react';
import '../../../assets/css/ControlCenter/ControlMenu.scss';
import Instruction from "./Instruction";

// ExportMenu отвечает за вывод всей инструкции по использованию компонента
class ExportMenu extends Component {
    render () {
        return (
            <div className="control-menu">
                <div className="control-menu__inner control-menu__inner_export">
                    <p className="control-menu__text">To import a component:</p>
                    <Instruction type={"import"}/>
                    
                    <p className="control-menu__text">Then you can use it:</p>
                    <Instruction type={"tag"}/>
                </div>
            </div>
        )
    }
}

export default ExportMenu;
