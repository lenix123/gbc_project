import React, {Component} from 'react'
import tree from '../../tree.json'
import '../../assets/css/App-menu/InnerTree.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import { faCaretRight, faCaretDown, faFileCode } from "@fortawesome/free-solid-svg-icons"
import FileBtn from "./FileBtn"
import DirBtn from "./DirBtn";

// устанавливаем иконки для разных положений кнопок навигации
const folderOpen = <FontAwesomeIcon className="tree-element__icon tree-element__icon_folder" icon={faFolderOpen}/>
const folderClose = <FontAwesomeIcon className="tree-element__icon tree-element__icon_folder" icon={faFolder}/>
const arrowDown = <FontAwesomeIcon className="tree-element__icon" icon={faCaretDown}/>
const arrowRight = <FontAwesomeIcon className="tree-element__icon" icon={faCaretRight}/>
const fileIcon = <FontAwesomeIcon className="tree-element__icon tree-element__icon_file" icon={faFileCode}/>

// компонент InnerTree выводит содержимое папки, которая его вызвала
class InnerTree extends Component {

    render () {
        const { openDir } = this.props;
        let indexDir;

        // нам передали название папки, которую нужно отобразить,
        // а нам нужно получить индекс этой папки
        for (let index = 0; index < tree.length; index++) {
            if (tree[index].name === openDir) {
               indexDir = index;
            }
        }

        const currentDir = tree[indexDir];

        // выводим все подпапки в нашей папке
        const dirBtn = currentDir.dirs.map((dirName) => (
            <DirBtn key={dirName}
                    dirName={dirName}/>
        ));

        // выводим все файлы в нашей папке
        const fileBtn = currentDir.files.map((file) => (
            <FileBtn key={file}
                     file={file}/>
        ));

        return (
            <div className="tree-element">
                {dirBtn}
                {fileBtn}
            </div>
        )
    }
}

export default InnerTree;
export { arrowRight, arrowDown, folderOpen, folderClose, fileIcon }