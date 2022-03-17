import React, { useState, useEffect }  from 'react';
import "../../../assets/css/ControlCenter/CreateBtn.scss";
import axios from "axios";

function CreateBtn(props) {
    return (
        <button className={"create_button"} onClick={handleSubmit}>
            Create
        </button>
    )

    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');

        const newComponent = {
            "type": "Buttons",
            "prototype": "Classic",
            "component_name": "My Classic 2",
            "params": {
                "fs": "20",
                "bg": "#ffffff",
                "text": "My Classic 2",
                "cl": "#ffffff",
                "fw": "",
                "br": "6"
            }
        };

        axios.post({
            method: "POST",
            url: "http://127.0.0.1:8000/api",
            data: newComponent
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default CreateBtn;