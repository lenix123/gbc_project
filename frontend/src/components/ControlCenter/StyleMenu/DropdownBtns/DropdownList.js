import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {createComponent, updateComponent, deleteComponent} from "./actions";
import {riseErrorName} from "../../../../store/componentNameForm/actions";
import {setSuccessfulStatus} from "../../../../store/createBtn/actions";
import {updateUserComponent} from "../../../../store/userLibrary/actions";
import {setErrorNotification, setSuccessNotification} from "../../../../store/notifications/actions";
import {connect} from "react-redux";


function DropdownList(props) {
    let btnList = [{
                action: "Create",
                icon: faPlus,
                onClick: handleCreate
            }];
    if (props.userComponentName !== "") {
        btnList.push({
            action: "Update",
            icon: faPen,
            onClick: handleUpdate
        });
        btnList.push({
            action: "Delete",
            icon: faTrash,
            onClick: handleDelete
        });
    }

    return(
        <div className="dropdown__btn-list">
            {btnList.map((btn, i) => (
                    <button className="dropdown__btn-list__button" key={i} onClick={btn.onClick}>
                        <FontAwesomeIcon className="dropdown__btn-list__button__icon" icon={btn.icon}/>{btn.action}
                    </button>
            ))}
        </div>
    )

    function handleCreate(e) {
        e.preventDefault();
        createComponent(props);
    }

    function handleUpdate(e) {
        e.preventDefault();
        updateComponent(props);
    }

    function handleDelete(e) {
        e.preventDefault();
        deleteComponent(props);
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        userComponentName: state.currentComponent.userComponentName,
        userComponentNames: state.userComponentName.namesForComponents,
        userComponentsList: state.currentComponent.userComponents,
        defaultLibrary: state.libraryState,
        userLibrary: state.userLibrary,
    }
}

const mapDispatchToProps = {
    riseErrorName,
    setSuccessfulStatus,
    updateUserComponent,
    setErrorNotification,
    setSuccessNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownList);