import React, { useState, useEffect }  from 'react';
import "../../../assets/css/ControlCenter/CreateBtn.scss";
import {determineType} from "../../../utils/userTree";
import axios from "axios";
import {riseErrorName} from "../../../store/componentNameForm/actions";
import {connect} from "react-redux";


function CreateBtn(props) {
    return (
        <button className={"create_button"} onClick={handleSubmit}>
            Create
        </button>
    )

    function handleSubmit(e) {
        e.preventDefault();
        if (props.token !== null) {
            const {userComponentName, componentName, userComponentNames, userComponentsList, userLibrary, defaultLibrary} = props;
            let currentComponent, componentsState;
            if (userComponentName !== "") {
                currentComponent = userComponentName;
                componentsState = userLibrary;
            } else {
                currentComponent = componentName;
                componentsState = defaultLibrary;
            }
            const nameOfNewComponent = userComponentNames[currentComponent];

            if (nameOfNewComponent === "") {
                props.riseErrorName("Fill this field in");
            } else if (userComponentsList.includes(nameOfNewComponent)) {
                props.riseErrorName("This name must be unique");
            } else {
                let componentStyle = componentsState[currentComponent];

                if (userComponentName !== "") {
                    if (["Card", "Entry"].includes(componentName)) {
                        if (componentStyle.btn !== "Initial") {
                            componentStyle.initialBtn = componentStyle.btn;
                            componentStyle.btnStyle = defaultLibrary[componentStyle.btn];
                            componentStyle.btn = "Initial";
                        }

                        if (componentName === "Entry" && componentStyle.type !== "Initial") {
                            componentStyle.initialLogin = componentStyle.type;
                            componentStyle.loginStyle = defaultLibrary[componentStyle.type];
                            componentStyle.type = "Initial";
                            componentStyle.passStyle = defaultLibrary["Password"];
                        }
                    }
                } else {
                    if (["Card", "Entry"].includes(componentName)) {
                        componentStyle.initialBtn = componentStyle.btn;
                        componentStyle.btnStyle = componentsState[componentStyle.btn] || componentsState["Classic"];
                        componentStyle.btn = "Initial";

                        if (componentName === "Entry") {
                            componentStyle.initialLogin = componentStyle.type;
                            componentStyle.loginStyle = componentsState[componentStyle.type] || componentsState["Email"];
                            componentStyle.type = "Initial";
                            componentStyle.passStyle = componentsState["Password"];
                        }
                    } else if (componentName === "BankCard") {
                        componentStyle.dataStyle = componentsState["Data"];
                    }
                }

                const component_name = nameOfNewComponent;
                const type = determineType(componentName);

                const newUserComponent = {
                    type: type,
                    prototype: componentName,
                    component_name: component_name,
                    params: componentStyle
                }

                axios.defaults.headers.common['Authorization'] = `Token ${props.token}`;
                axios.post("http://127.0.0.1:8000/api/", newUserComponent).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userComponentNames: state.userComponentName.namesForComponents,
        userComponentsList: state.currentComponent.userComponents
    }
}

const mapDispatchToProps = {
    riseErrorName
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBtn);