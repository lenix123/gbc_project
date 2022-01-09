import React, {Component} from "react";
import "./Data.css";
import StyleReader from "../../../../utils/StyleReader";
import {connect} from "react-redux";
import {dataKeyDown, dataPaste, maskForData} from "./mask";


class Data extends Component {
    state = {
        value: '',
        type: 'text',
    }

    render() {
        const {componentsState, className, formMask, formPlaceholder, id} = this.props;
        const componentStyle = componentsState && componentsState["Data"];
        let styleReader = new StyleReader(componentStyle);

        const mask = formMask || componentStyle["mask"] || "99/99/9999";
        const placeholder = formPlaceholder || componentStyle["text"] || "Data";

        return (
            <input type="text"
                   id={id}
                   placeholder={placeholder}
                   className={className + " dataInput"}
                   style={styleReader.style}
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

        if (this.props.onChange) {
            this.props.onChange();
        }

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

const mapStateToProps = (state) => {
    return {
        componentsState: state.libraryState
    }
}

export default connect(mapStateToProps)(Data);