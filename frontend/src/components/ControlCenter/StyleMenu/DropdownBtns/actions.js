import {determineType} from "../../../../utils/userTree";
import axios from "axios";


export function createComponent(props) {
    const {userComponentName, componentName, userComponentNames, userComponentsList, userLibrary, defaultLibrary} = props;
    let currentComponent;
    if (userComponentName !== "") {
        currentComponent = userComponentName + userComponentsList[userComponentName];
    } else {
        currentComponent = componentName;
    }
    const nameOfNewComponent = userComponentNames[currentComponent];

    if (!nameOfNewComponent) {
        props.riseErrorName("This field is required.");
    } else if (userComponentsList.hasOwnProperty(nameOfNewComponent)) {
        props.riseErrorName("This name must be unique.");
    } else {
        const componentStyle = formStyles(componentName, userComponentName, defaultLibrary, userLibrary);
        const type = determineType(componentName);

        const newUserComponent = {
            type: type,
            prototype: componentName,
            component_name: nameOfNewComponent,
            params: componentStyle
        }

        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/",
            data: newUserComponent
        }).then(() => {
            props.setSuccessfulStatus();
            props.setSuccessNotification(`${nameOfNewComponent} was created.`)
        }).catch((error) => {
            const errors = JSON.parse(error.request.response);
            props.setErrorNotification(Object.values(errors)[0][0])
        });
    }
}

export function updateComponent(props) {
    const {userComponentName, componentName, userLibrary, defaultLibrary, userComponentsList} = props;
    const idToUpdate = userComponentsList[userComponentName];
    if (idToUpdate !== undefined) {
        const componentStyle = formStyles(componentName, userComponentName, defaultLibrary, userLibrary);
        const type = determineType(componentName);

        const updateUserComponent = {
            type: type,
            prototype: componentName,
            component_name: userComponentName,
            params: componentStyle
        }

        axios({
            method: "PUT",
            url: `http://127.0.0.1:8000/api/${idToUpdate}/`,
            data: updateUserComponent
        }).then(() => {
            props.updateUserComponent(userComponentName, componentStyle);
            props.setSuccessNotification(`${userComponentName} was updated.`)
        }).catch((error) => {
            const errors = JSON.parse(error.request.response);
            props.setErrorNotification(Object.values(errors)[0][0]);
        });
    }
}

export function deleteComponent(props) {
    const {userComponentsList, userComponentName} = props;
    const idToDelete = userComponentsList[userComponentName];
    if (idToDelete !== undefined) {
        axios({
            method: "DELETE",
            url: `http://127.0.0.1:8000/api/${idToDelete}/`,
        }).then(() => {
            props.setSuccessfulStatus();
            props.setSuccessNotification(`${userComponentName} was deleted.`)
        }).catch((error) => {
            const errors = JSON.parse(error.request.response);
            props.setErrorNotification(Object.values(errors)[0]);
        });
    }
}

function formStyles(componentName, userComponentName, defaultLibrary, userLibrary) {
    let componentStyle;
    if (userComponentName !== "") {
        componentStyle = userLibrary[userComponentName];
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
        componentStyle = defaultLibrary[componentName];
        if (["Card", "Entry"].includes(componentName)) {
            componentStyle.initialBtn = componentStyle.btn || "Classic";
            componentStyle.btnStyle = defaultLibrary[componentStyle.btn] || defaultLibrary["Classic"];
            componentStyle.btn = "Initial";

            if (componentName === "Entry") {
                componentStyle.initialLogin = componentStyle.type;
                componentStyle.loginStyle = defaultLibrary[componentStyle.type] || defaultLibrary["Email"];
                componentStyle.type = "Initial";
                componentStyle.passStyle = defaultLibrary["Password"];
            }
        } else if (componentName === "BankCard") {
            componentStyle.dataStyle = defaultLibrary["Data"];
        }
    }

    return componentStyle;
}