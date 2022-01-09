import React from "react";
import InnerTree from "./InnerTree";
import { arrowRight, arrowDown, folderOpen, folderClose } from "./InnerTree"

// компонент DirBtn отвечает конкретное папке dirName,
// при нажатии на кнопку открывается содержимое этой папки
class DirBtn extends React.Component {
    state = {
        isActive: false
    }

    render() {
        const {dirName} = this.props;
        // устанавливаем значки для папки в разных положениях
        const arrowIcon = this.isActive() ? arrowDown : arrowRight;
        const folderIcon = this.isActive() ? folderOpen : folderClose;
        // открываем содержимое папки, если изменили состояние на true
        const innerTree = this.isActive() && <InnerTree openDir={dirName}/>

        return(
            <div>
                <button className={"tree-element__dir"}
                        onClick={this.goDown}>
                    <div className={`tree-element__highlighter tree-element__highlighter_disabled`}/>
                    {arrowIcon}
                    {folderIcon}
                    {dirName}
                </button>
                {innerTree}
            </div>
        )
    }
    goDown = () => {
        // по нажатию на кнопку изменяем состояние на противоположное
        this.setState((state) => ({ isActive: !state.isActive }))
    }

    isActive = () => {
        return this.state.isActive;
    }
}

export default DirBtn;