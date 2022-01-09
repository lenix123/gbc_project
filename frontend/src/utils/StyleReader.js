// StyleReader ответственен за преобразование объекта свойств компонента в его стили
class StyleReader {
    constructor(componentStyle) {
        this._componentStyle = componentStyle;
        this._style = {};
        this._userClassName = '';
        this._btn = 'Classic';
    }

    // геттер для получения значения атрибута className,
    // регулирующего стили компонента (задействуется в экспорте)
    get className() {
        return this._buildClassName(this._componentStyle)
    }

    // геттер для получения пользовательского класса
    get userClassName() {
        this._decomposeComponentStyle();
        return this._userClassName;
    }

    // геттер для получения объекта стилей компонента
    get style() {
        this._decomposeComponentStyle();
        return this._style;
    }

    // геттер для получения выбранной пользователем кнопки
    get button() {
        this._decomposeComponentStyle();
        return this._btn;
    }

    // геттер для получения выбранной пользователем картинки
    get url() {
        this._decomposeComponentStyle();
        return this._url;
    }

    // метод, раскладывающий объект свойств конкретного компонента,
    // на данные для геттеров, описанных выше
     _decomposeComponentStyle() {
        const properties = Object.keys(this._componentStyle);

        // для каждого свойства подбирает свой стиль
        properties.forEach(property => {
            const value = this._componentStyle[property];
            // если свойство пусто, то стиль задан не был,
            // и отображение такого стиля не требуется
            if (value === '') return null;

            // подбор в соответствии с названием свойства
            switch (property) {
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
                case 'bc':
                    this._style.borderColor = value;
                    break;
                case 'bw':
                    this._style.borderWidth = value + 'px';
                    break;
                case 'oc':
                    this._style.outlineColor = value;
                    break;
                case 'ow':
                    this._style.outlineWidth = value + 'px';
                    break;
                case 'br':
                    this._style.borderRadius = value + 'px';
                    break;
                case 'wd':
                    if (value < 80) break;
                    this._style.width = value + 'px';
                    break;
                case 'btn':
                    this._btn = value;
                    break;
                case 'url':
                    this._url = value;
                    break;
                case 'text':
                    break;
                case 'mask':
                    break;
                // если соответствие не найден, то это пользовательский класс
                default:
                    this._userClassName += property;
            }

            // добавить пробел после пользовательского класса, если последний имеется
            if (this._userClassName !== '') this._userClassName += ' ';
        });
    }

    // метод, переводящий значение толщины шрифта в приемлемый формат
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

    // строит значение атрибута className, регулирующего стиль компонента
    _buildClassName(componentStyle) {
        let className = '';

        for (let style in componentStyle) {
            if (
                style !== 'text' &&
                style !== 'btn' &&
                style !== 'url' &&
                componentStyle.hasOwnProperty(style) &&
                componentStyle[style] !== ''
            ) {
                // формат ввода стилей, с которым работает пользователь
                // сначала идет тип стиля, затем его значение
                className += `${style}-${componentStyle[style].toLowerCase()} `
            }
        }

        return className.trim();
    }
}

export default StyleReader;