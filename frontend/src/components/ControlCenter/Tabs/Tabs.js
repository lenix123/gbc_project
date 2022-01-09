import React, { Component } from 'react';
import '../../../assets/css/ControlCenter/Tabs.scss';
import TabItem from "./TabItem";
import ThemeContext from "../../ThemeControl/ThemeContext";
import {connect} from "react-redux";

// Tabs представляет из себя панель вкладок
class Tabs extends Component {

    render() {
        // получает в виде пропсов метод-колбэк, позволяющий переключить вкладку, и название текущей вкладки
        const { switchTab, currentTabName, componentName } = this.props;
        const themeContext = this.context.theme;

        // список доступных вкладок
        let btnNames;
        if (componentName === "Outline") {
            btnNames = ["Style", "Export", "Info"];
        } else {
            btnNames = ["Style", "Export"];
        }

        // на основе списка вкладок создается массив компонентов, являющихся отдельными вкладками (TabItem)
        const tabItems = btnNames.map((name, index) => {
            return <TabItem tabItemName={name}
                            switchTab={switchTab}
                            currentTabName={currentTabName}
                            key={index}/>
        });

        return(
            <div className={`tabs tabs_${themeContext}`}>
                {tabItems}
            </div>
        )
    }

    // передача контекста текущей UI-темы
    static contextType = ThemeContext;
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName
    }
}

export default connect(mapStateToProps)(Tabs);
