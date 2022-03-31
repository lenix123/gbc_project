import React from "react";
import DisplayingText from "./DisplayingText";
import CopyButton from "./CopyButton";
import textBuilder from "../../../utils/textBuilder";
import {connect} from "react-redux";

// компонент Instruction отвечает за вывод одного блока инструкции,
// то есть теста инструкции и кнопки "копировать"
class Instruction extends React.Component {
    render() {
        const {type, componentName, userComponentName, componentsState, userLibrary} = this.props;
        let text;

        if (type === "import") {
            // формируем инструкцию по импорту компанента
            text = this.importText(componentName);
            if (componentName === "Card") {
                // импортируем кнопку для компонента Card
                const buttonName = componentsState["Card"].btn || "Classic";
                text += `\n${this.importText(buttonName)}`;
            } else if (componentName === "Entry") {
                // импортируем составные компоненты для Entry
                const formType = componentsState["Entry"].type || "Email";
                text += `\n${this.importText(formType)}`;
                text += `\n${this.importText("Password")}`;

                const buttonName = componentsState["Entry"].btn || "Classic";
                text += `\n${this.importText(buttonName)}`;
            }
        } else if (type === "tag") {
            // формируем инструкцию по вызову компонента
            text = textBuilder(componentName, userComponentName, componentsState, userLibrary);
            // заменяем все символы табуляции на 4 пробела,
            // так код выглядит лучше
            text = text.replaceAll(/\t/g, "    ");
        }

        return (
            <div className="instruction">
                <DisplayingText text={text}/>
                <CopyButton text={text}/>
            </div>
        )
    }

    importText = (componentName) => {
        return `import ${componentName} from "path/to/Library/${componentName}/${componentName}";`;
    }
}

const mapStateToProps = (state) => {
    return {
        componentName: state.currentComponent.componentName,
        userComponentName: state.currentComponent.userComponentName,
        componentsState: state.libraryState,
        userLibrary: state.userLibrary,
    }
}

export default connect(mapStateToProps)(Instruction);