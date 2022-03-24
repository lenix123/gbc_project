import React, { Component } from 'react';
import '../../../assets/css/ControlCenter/InputForms.scss';
import CreateBtn from "./CreateBtn";
import ComponentNameForm from "./componentNameForm";
import FormTemplate from './Forms/FormTemplate';
import ResetBtn from "./ResetBtn";
import {connect} from "react-redux";


// StyleMenu отвечает за меню стилевых форм
class StyleMenu extends Component {
    render () {
        const {defaultLibrary, userLibrary, componentName, token, isUserComponent, userComponentName} = this.props;
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

        const createBtn = token !== null ? <CreateBtn token={token}
                                                      componentName={componentName}
                                                      userComponentName={userComponentName}
                                                      userLibrary={userLibrary}
                                                      defaultLibrary={defaultLibrary}/> : "";

        const componentNameForm = token !== null ? <ComponentNameForm /> : "";
        // formsList.unshift(componentNameForm);

        // рендерит формы и кнопку сброса стилей
        return (
            <div className="control-menu">
                <div className="control-menu__inner">
                    {componentNameForm}
                    {formsList}
                </div>
                <div>
                    <ResetBtn/>
                    {createBtn}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        isUserComponent: state.currentComponent.isUserComponent,
        userComponentName: state.currentComponent.userComponentName,
        defaultLibrary: state.libraryState,
        userLibrary: state.userLibrary,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(StyleMenu);
