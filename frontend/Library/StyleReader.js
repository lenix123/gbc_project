class StyleReader {
    constructor(componentClass) {
        this._className = componentClass
        this._userClassName = '';
        this._style = {};
        this._currentButton = 'Classic';
        this._url = '';
        this._colorOnHover = '';
        this._decomposeClassName()
    }

    get userClassName() {
        this._decomposeClassName();
        return this._userClassName;
    }

    get style() {
        this._decomposeClassName();
        return this._style;
    }

    get button() {
        this._decomposeClassName();
        return this._currentButton;
    }

    _decomposeClassName() {
        const properties = this._className.split(' ');

        properties.forEach(property => {
            let propertyName = property.split("-")[0];
            let value = property.split("-")[1];

            switch (propertyName) {
                case 'fs':
                    this._style.fontSize = value + 'px';
                    break;
                case 'fw':
                    this._style.fontWeight = this._handleFwProperty(value);
                    break;
                case 'bg':
                    this._style.background = value;
                    break;
                case 'cl':
                    this._style.color = value;
                    break;
                case 'clh':
                    this._colorOnHover = value;
                    break;
                case 'bc':
                    this._style.borderColor = value;
                    break;
                case 'bw':
                    this._style.borderWidth = value + 'px';
                    break;
                case 'wd':
                    if (value < 80) break;
                    this._style.width = value + 'px';
                    break;
                case 'br':
                    this._style.borderRadius = value + 'px';
                    break;
                case 'btn':
                    this._currentButton = value;
                    break;
                default:
                    this._userClassName += property;
            }

            if (this._userClassName !== '') this._userClassName += ' ';
        });
    }

    _handleFwProperty(value) {
        switch (value.toLowerCase()) {
            case 'light':
                return '400';
            case 'bold':
                return '600';
            default:
                return '500';
        }
    }
}

export default StyleReader;