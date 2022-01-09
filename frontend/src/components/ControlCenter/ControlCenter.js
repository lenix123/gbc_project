import React, { Component } from 'react';
import '../../assets/css/ControlCenter/ControlCenter.scss';
import Tabs from "./Tabs/Tabs.js";
import StyleMenu from "./StyleMenu/StyleMenu";
import ExportMenu from "./ExportMenu/ExportMenu";
import InfoMenu from "./InfoMenu/InfoMenu"

// ControlCenter отвечает за отображаение меню стилей (StyleMenu) и экспорта (ExportMenu)
class ControlCenter extends Component {
    // состояние хранит текущую открытую вкладку (меню)
    state = {
        currentTabName: 'Style'
    }


    render() {
        let currentMenu;

        switch ( this.currentTabName() ) {
            case ('Style'):

                // передаем в качестве пропсов колбэки и стиль компонента
                currentMenu = <StyleMenu/>
                break;
            case ('Export'): {

                // передаем в качестве пропсов состояние стилей компонентов и
                // название текущего компонента
                currentMenu = <ExportMenu/>
                break;
            }
            case ('Info'):
                currentMenu = <InfoMenu/>
        }

        // рендерим панель вкладок (Tabs) и выбранное на панели меню
        return(
            <div className="control-center">
                <Tabs currentTabName={this.currentTabName()}
                      switchTab={this.switchTab}/>
                {currentMenu}
            </div>
        )
    }

    // метод, отвечающий за смену вкладок
    switchTab = (currentTabName) => {
        this.setState({
            currentTabName: currentTabName,
        })
    }

    currentTabName = () => {
        return this.state.currentTabName;
    }
}

export default ControlCenter;
