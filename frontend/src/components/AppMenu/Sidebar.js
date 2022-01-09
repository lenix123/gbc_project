import React, {Component} from 'react'
import '../../assets/css/App-menu/Sidebar.scss'
import DirBtn from "./DirBtn";

// компонент Sidebar отвечает за навигацию в приложении
class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="container">
                    <div className="sidebar__inner">
                        <div className="sidebar__dividing-line"/>
                        <p className="sidebar__title">LIBRARY</p>

                        <div className="sidebar__wrapper">
                            <DirBtn dirName={"Library"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Sidebar