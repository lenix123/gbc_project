import React from 'react';
import '../assets/css/Workspace.scss'
import * as components from "../utils/Hub"
import ControlCenter from "./ControlCenter/ControlCenter";
import ThemeContext from "./ThemeControl/ThemeContext";
import {connect} from "react-redux";


// один из ключевых компонентов
// Workspace отображает рабочее пользовательское пространство в правой части приложения
class Workspace extends React.Component {
    render() {
        const {componentName} = this.props;

        const themeContext = this.context.theme;
        // исходя из переданного пропсом имени выбирается текущий компонент для отображения
        const Component = components[componentName];

        // проверка на то, открыт ли компонент
        const currentComponent = componentName && <Component />
        // аналогично
        const currentMenu = componentName && <ControlCenter resetStyles={this.resetStyles}/>;

        return (
            <div className={`workspace workspace_${themeContext}`}>
                <div className="workspace__inner">
                    <div className="workspace__content">
                        {currentComponent}
                    </div>
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