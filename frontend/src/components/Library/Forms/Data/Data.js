import React, {Component} from "react";
import "./Data.css";
import StyleReader from "../../../../utils/StyleReader";
import {dataKeyDown, dataPaste, maskForData} from "./mask";


class Data extends Component {
    state = {
        value: '',
        type: 'text',
    }

    render() {
        const {componentStyles, className, formMask, formPlaceholder, id} = this.props;

        const styleReader = new StyleReader(componentStyles);
        const style = styleReader.style;

        const mask = formMask || componentStyles["mask"] || "99/99/9999";
        const placeholder = formPlaceholder || componentStyles["text"] || "Data";

        return (
            <input type="text"
                   id={id}
                   placeholder={placeholder}
                   className={className + " dataInput"}
                   style={style}
                   data-mask={mask}
                   onChange={this.handleChange}
                   onKeyDown={this.onDataKeyDown}
                   onPaste={this.onDataPaste}
                   value={this.state.value}/>
        );
    }

    handleChange = (event) => {
        const mask = event.target.dataset.mask;
        maskForData(event, mask);

        this.setState({
            value: event.target.value
        })
    }

    onDataKeyDown = (event) => {
        const mask = event.target.dataset.mask;
        dataKeyDown(event, mask);
        this.setState({
            value: event.target.value
        })
    }

    onDataPaste = (event) => {
        const mask = event.target.dataset.mask;
        event.preventDefault();
        dataPaste(event, mask);
        this.setState({
            value: event.target.value
        })
    }
}

export default Data;