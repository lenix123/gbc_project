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
        const {dirName, userTree} = this.props;
        const isActive = this.state.isActive;
        // устанавливаем значки для папки в разных положениях
        const arrowIcon = isActive ? arrowDown : arrowRight;
        const folderIcon = isActive ? folderOpen : folderClose;
        // открываем содержимое папки, если изменили состояние на true
        const innerTree = isActive && <InnerTree openDir={dirName} userTree={userTree}/>

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
        const prevIsActive = this.state.isActive;
        this.setState({ isActive: !prevIsActive })
    }
}

export default DirBtn;