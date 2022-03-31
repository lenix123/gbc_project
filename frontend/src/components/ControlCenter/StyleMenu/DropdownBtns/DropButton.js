import React from "react";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function DropButton(props) {
    return(
        <button className="dropdown__button" onClick={props.onClick}>
            actions <FontAwesomeIcon className="dropdown__button__angle-down" icon={faAngleDown}/>
        </button>
    )
}

export default DropButton;