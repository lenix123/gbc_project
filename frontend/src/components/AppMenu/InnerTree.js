import React, {Component} from 'react';
import '../../assets/css/App-menu/InnerTree.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faCaretRight, faCaretDown, faFileCode } from "@fortawesome/free-solid-svg-icons";
import FileBtn from "./FileBtn";
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
        const { openDir, tree } = this.props;
        let currentDir, dirsInside;

        if (Object.keys(tree).length) {
            currentDir = tree[openDir];
            if (currentDir.dirs.isArray) {
                dirsInside = currentDir.dirs;
            } else {
                dirsInside = Array.from(currentDir.dirs);
            }
        }

        // выводим все подпапки в нашей папке
        const dirBtn = dirsInside.map((dirName) => (
            <DirBtn key={dirName}
                    dirName={dirName}
                    tree={tree}/>
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