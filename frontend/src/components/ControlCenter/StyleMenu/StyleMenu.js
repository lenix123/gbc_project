import React, { Component } from 'react';
import '../../../assets/css/ControlCenter/InputForms.scss';
import FormTemplate from './Forms/FormTemplate';
import ResetBtn from "./ResetBtn";
import {connect} from "react-redux";

// StyleMenu отвечает за меню стилевых форм
class StyleMenu extends Component {
    render () {
        const {componentsState, componentName} = this.props;
        const componentStyle = componentsState[componentName];
        let formsList = [];

        // проходится по каждому свойству объекта стилей компонента,
        // на основе этих свойств формирует массив стилевых форм
        for (let styleType in componentStyle) {
            if ( componentStyle.hasOwnProperty(styleType) ) {
                formsList.push(<FormTemplate styleType={styleType}
                                             key={styleType}/>)
            }
        }

        // рендерит формы и кнопку сброса стилей
        return (
            <div className="control-menu">
                <div className="control-menu__inner">
                    {formsList}
                </div>
                <ResetBtn/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(StyleMenu);
