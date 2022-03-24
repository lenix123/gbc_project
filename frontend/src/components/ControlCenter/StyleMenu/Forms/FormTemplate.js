import React from 'react';
import DropdownForm from "./InputForms/DropdownForm";
import TextForm from "./InputForms/TextForm";
import NumberForm from "./InputForms/NumberForm";
import ColorForm from "./InputForms/ColorForm";

// FormTemplate - шаблон, в зависимости от пропсов которого, выбирается нужная форма
function FormTemplate(props) {
    const {styleType, isUserComponent} = props;
    let form;

    // по типу (стилю) формы выбирает нужную из списка
    switch (styleType) {
        // размер шрифта (font-size)
        case 'fs':
            form = <NumberForm label={"Font Size"}
                               styleType={'fs'}/>
            break;
        // ширина границы (border-width)
        case 'bw':
            form = <NumberForm label={"Border Width"}
                               styleType={'bw'}/>
            break;
        // цвет фона (background)
        case 'bg':
            form = <ColorForm label={"Background"}
                              styleType={'bg'}/>
            break;
        // цвет шрифта (color)
        case 'cl':
            form = <ColorForm label={"Color"}
                              styleType={'cl'}/>
            break;
        // цвет границы (border-color)
        case 'bc':
            form = <ColorForm label={"Border Color"}
                              styleType={'bc'}/>
            break;
        // ширина обводки (outline width)
        case 'ow':
            form = <NumberForm label={"Outline Width"}
                               styleType={'ow'}/>
            break;
        // цвет обводки (outline color)
        case 'oc':
            form = <ColorForm label={"Outline Color"}
                              styleType={'oc'}/>
            break;
        // цвет текста при наведении на компонент
        case 'clh':
            form = <ColorForm label={"Color on hover"}
                              styleType={'clh'}/>
            break;
        // толщина шрифта (font-weight)
        case 'fw':
            const fontWeight = ["Light", "Regular", "Bold"];
            form = <DropdownForm label={"Font weight"}
                                 elements={fontWeight}
                                 styleType={'fw'}/>
            break;
        // ширина компонента (width)
        case 'wd':
            form = <NumberForm label={"Width"}
                               styleType={'wd'}/>
            break;
        // закругление краев (border-radius)
        case 'br':
            form = <NumberForm label={"Border Radius"}
                               styleType={'br'}/>
            break;
        // тип ввода формы
        case 'type':
            let types = ["Email", "Telephone", "Login"];
            if (isUserComponent) {
                types.unshift("Initial");
            }

            form = <DropdownForm label={"Type"}
                                 elements={types}
                                 styleType={'type'}/>
            break;
        // выбор кнокпи компонента
        case 'btn':
            let buttons = ["Classic", "Waves", "Outline"];
            if (isUserComponent) {
                buttons.unshift("Initial");
            }

            form = <DropdownForm label={"Button"}
                                 elements={buttons}
                                 styleType={'btn'}/>
            break;
        // выбор синхранизации стилей форм
        case 'sync':
            const sync = ["None", "Login", "Pass"];
            form = <DropdownForm label={"Synchronize"}
                                 elements={sync}
                                 styleType={'sync'}/>
            break;
        // текстовое поле компонента
        case 'text':
            form = <TextForm label={"Text"}
                             styleType={'text'}/>
            break;
        // поля для ввода маски для формы
        case 'mask':
            form = <TextForm label={"Mask"}
                             styleType={'mask'}/>
            break;
        // адрес картинки
        case 'url':
            form = <TextForm label={"Image URL"}
                             styleType={'url'}/>
        }

    return (
        form
    );
}

export default FormTemplate;