import React, {Component} from 'react';
import '../../assets/css/App-menu/Sidebar.scss';
import tree from '../../tree.json';
import DirBtn from "./DirBtn";
import userTreeBuilder from "../../utils/userTree";

// компонент Sidebar отвечает за навигацию в приложении
class Sidebar extends Component {
    state = {
        userTree: {},
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const userComponents = this.props.userComponents;
        if (this.props !== prevProps && userComponents.length) {
            const userTree = userTreeBuilder(userComponents);
            this.setState({
                userTree: userTree,
            })
        }
    }

    render() {
        const userTree = this.state.userTree;
        const isUserTreeEmpty = Object.keys(userTree).length !== 0;
        const userLibrary = isUserTreeEmpty && <DirBtn dirName={"Saved"} tree={userTree}/>;

        return (
            <div className="sidebar">
                <div className="container">
                    <div className="sidebar__inner">
                        <div className="sidebar__dividing-line"/>
                        <p className="sidebar__title">LIBRARY</p>

                        <div className="sidebar__wrapper">
                            <DirBtn dirName={"Library"} tree={tree}/>
                            {userLibrary}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Sidebar