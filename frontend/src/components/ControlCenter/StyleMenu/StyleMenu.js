import React, { Component } from 'react';
import '../../../assets/css/ControlCenter/InputForms.scss';
import ComponentNameForm from "./componentNameForm";
import FormTemplate from './Forms/FormTemplate';
import ResetBtn from "./ResetBtn";
import Dropdown from "./DropdownBtns/Dropdown";
import {connect} from "react-redux";


// StyleMenu отвечает за меню стилевых форм
class StyleMenu extends Component {
    render () {
        const {defaultLibrary, componentName, token, isUserComponent} = this.props;
        const componentStyle = defaultLibrary[componentName];
        let formsList = [];

        // проходится по каждому свойству объекта стилей компонента,
        // на основе этих свойств формирует массив стилевых форм
        for (let styleType in componentStyle) {
            if ( componentStyle.hasOwnProperty(styleType) ) {
                formsList.push(<FormTemplate styleType={styleType}
                                             isUserComponent={isUserComponent}
                                             key={styleType}/>)
            }
        }

        const isAuthorised = token !== null;

        const componentNameForm = isAuthorised ? <ComponentNameForm /> : "";
        const ActionsDropdown = isAuthorised ? <Dropdown /> : "";
        // рендерит формы и кнопку сброса стилей
        return (
            <div className="control-menu">
                <div className="control-menu__inner">
                    {componentNameForm}
                    {formsList}
                </div>
                <div className="control-menu__buttons">
                    <ResetBtn/>
                    {ActionsDropdown}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        isUserComponent: state.currentComponent.isUserComponent,
        defaultLibrary: state.libraryState,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(StyleMenu);
