import React, { Component } from 'react';

// TabItem - одна вкладка в целой панели вкладок (Tabs)
class TabItem extends Component {

    render() {
        // получает из пропсов имя данной вкладки и имя активной вкладки
        const {tabItemName, currentTabName} = this.props;
        // переменная содержит информацию о том, совпадает ли активная (открытая) вкладка с текущей
        const activeMarker = tabItemName === currentTabName ? 'active' : 'disabled';

        return(
            <div className="tabs__wrapper">
                <button className="tabs__btn"
                        onClick={this.handleClick}>
                    {tabItemName}
                </button>
                <div className={`tabs__underline tabs__underline_${activeMarker}`}/>
            </div>
        )
    }

    // метод, обрабатывающий нажатие и вызывающий функцию-колбэк смены активной вкладки
    handleClick = () => {
        const { switchTab, tabItemName } = this.props;
        switchTab(tabItemName);
    }
}


export default TabItem;
