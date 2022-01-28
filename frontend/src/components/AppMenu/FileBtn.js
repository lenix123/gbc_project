import React, {Component} from 'react'
import { fileIcon } from './InnerTree'
import {connect} from "react-redux";
import {setComponentName} from "../../store/currentComponent/actions";

// FileBtn – компонент-кнопка, отображающая название файла на боковой панели
class FileBtn extends Component {
    state = {
        isFocused: false
    }

    // метод, вызывающийся перед рендером компонента
    // метод позволяет отследить изменение фокуса на компоненте
    static getDerivedStateFromProps(props, state) {
        const { componentName, file, isUserFile, currentUserComponent } = props;
        const fileName = file.slice(0, -3);
        let isEqual;

        if (isUserFile) {
            isEqual = fileName === currentUserComponent;
        } else {
            if (currentUserComponent) {
                isEqual = false;
            } else {
                isEqual = fileName === componentName
            }
        }

        // если кнопка в фокусе,
        // но ее название не совпадает с названием прожатой в данный момент кнопки,
        // то фокус нужно снять, и наоборот
        if (state.isFocused && !isEqual) {
            return { isFocused: false }
        } else if (!state.isFocused && isEqual) {
            return { isFocused: true }
        }

        // в ином случае оставить без изменений
        return null;
    }

    render() {
        const condition = this.isFocused() ? 'active' : 'disabled';

        return (
            <button className="tree-element__file"
                    onClick={ this.displayComponent }
                    onMouseOver={ this.eliminate }>
                <div className={`tree-element__highlighter tree-element__highlighter_${condition}`}/>
                    {fileIcon}
                <div className="tree-element__wrapper">
                    {this.props.file}
                </div>
            </button>
        )
    }

    // метод вызывает колбэк, отображающий компонент или прячущий его
    displayComponent = () => {
        const { setComponentName, file, isUserFile, dir } = this.props;
        const fileName = file.slice(0, -3);

        if (isUserFile) {
            setComponentName(dir, isUserFile, fileName)
        } else {
            setComponentName(fileName, isUserFile, "");
        }

        // присвоить компоненту фокус, если он отображается, и наоборот
        this.setState({
            isFocused: !this.isFocused()
        })
    }

    // подсвечивает компонент при наведении мыши
    eliminate = () => {
        this.setState({
            isFocused: !this.isFocused()
        })
    }

    isFocused = () => {
        return this.state.isFocused;
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        currentUserComponent: state.currentComponent.userComponentName,
    }
}

const mapDispatchToProps = {
    setComponentName
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBtn);