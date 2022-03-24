import React from 'react';
import '../assets/css/Workspace.scss';
import ControlCenter from "./ControlCenter/ControlCenter";
import ComponentCaller from "./ComponentCaller";
import ThemeContext from "./ThemeControl/ThemeContext";
import {connect} from "react-redux";


// один из ключевых компонентов
// Workspace отображает рабочее пользовательское пространство в правой части приложения
class Workspace extends React.Component {
    render() {
        const {componentName} = this.props;

        const themeContext = this.context.theme;

        // проверка на то, открыт ли компонент
        const currentComponent = componentName && <ComponentCaller />
        // аналогично
        const currentMenu = componentName && <ControlCenter resetStyles={this.resetStyles}/>;

        return (
            <div className={`workspace workspace_${themeContext}`}>
                <div className="workspace__inner">
                    {currentComponent}
                    {currentMenu}
                </div>
            </div>
        )
    }

    // передача контекста текущей UI-темы
    static contextType = ThemeContext;
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
    }
}

export default connect(mapStateToProps)(Workspace);