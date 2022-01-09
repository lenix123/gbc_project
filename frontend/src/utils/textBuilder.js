import StyleReader from "./StyleReader";

// функция textBuilder строит текст для вывода на сайте в разделе "Export"
export default function textBuilder(componentName, componentsState) {
    let text;

    const buttons = ["Classic", "Outline", "Waves"];
    const authorization = ["Login", "Email", "Telephone", "Password"];

    if (buttons.includes(componentName)) {
        text = tagBuilder(componentName, componentsState[componentName]);
    } else if (authorization.includes(componentName)) {
        const isSimple = true;
        text = AuthorizationText(componentName, componentsState, isSimple);
    } else if (componentName === "Data") {
        const replaceParams = ["mask"];
        const additionalProp = ["mask"];
        text = tagBuilder("Data", componentsState["Data"], additionalProp, replaceParams);
    } else if (componentName === "Card") {
        text = CardText(componentsState);
    } else if (componentName === "Entry") {
        text = EntryText(componentsState);
    } else if (componentName === "BankCard") {
        text = BankCardText(componentsState);
    }

    return text;
}


function AuthorizationText(formName, componentsState, isSimple) {
    let componentStyle = componentsState[formName];

    // делаем синхранизацию стилей для форм из Entry
    if (!isSimple) {
        const sync = componentsState["Entry"].sync;
        if (sync === "Login") {
            // берём стили выбранной формы из состояния Entry
            const typeForm = componentsState["Entry"].type || "Email";
            componentStyle = componentsState[typeForm];
        } else if (sync === "Pass") {
            // синхронизируем стили с формой "Password"
            componentStyle = componentsState["Password"];
        }
    }

    return tagBuilder(formName, componentStyle);
}


function CardText(componentsState) {
    const componentStyle = componentsState["Card"];
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const Button = componentStyle.btn || "Classic";

    const replaceParams = ["src"];
    const additionalProp = ["src"];
    const propsText = propsBuilder(componentStyle, replaceParams, additionalProp);

    const buttonCode = tagBuilder(Button, componentsState[Button]);

    return `<Card${propsText}>${componentText}\n\t${buttonCode}\n</Card>`;
}


function EntryText(componentsState) {
    const componentStyle = componentsState["Entry"];
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const Button = componentStyle.btn || "Classic";
    const typeForm = componentStyle.type || "Email";

    const replaceParams = ["btn", "type", "sync"];
    const propsText = propsBuilder(componentStyle, replaceParams);

    const isSimple = false;
    const Login = AuthorizationText(typeForm, componentsState, isSimple);
    // второе поле в Entry всегда является паролем, поэтому оно отличается только типом
    const Pass = AuthorizationText("Password", componentsState, isSimple);

    const buttonCode = tagBuilder(Button, componentsState[Button]);

    return `<Entry${propsText}>${componentText}\n\t${Login}\n\t${Pass}\n\t${buttonCode}\n</Entry>`;
}


function BankCardText(componentsState) {
    const componentStyle = componentsState["BankCard"];
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const propsText = propsBuilder(componentStyle);

    const CardNumber = CardForm(componentsState["Data"], "Card Number", "cardNumber");
    const Month = CardForm(componentsState["Data"], "MM", "period");
    const Year = CardForm(componentsState["Data"], "YY", "period");
    const CVV = CardForm(componentsState["Data"], "CVV", "code");

    return `<BankCard${propsText}>${componentText}\n\t${CardNumber}\n\t${Month}\n\t${Year}\n\t${CVV}\n</BankCard>`
}

// CardForm формирует код для полей банковской карточки
function CardForm(componentStyle, placeholder, formType) {
    const replaceParams = ["mask"];
    let propsText = propsBuilder(componentStyle, replaceParams);

    // Добавляем нужную маску
    if (formType === "cardNumber") {
        propsText = ' mask="9999-9999-9999-9999"' + propsText;
    } else if (formType === "period") {
        propsText = ' mask="99"' + propsText;
    } else if (formType === "code") {
        propsText = ' mask="999"';
    }

    return `<Data${propsText}>${placeholder}</Data>`
}


function tagBuilder(componentName, componentStyle, additionalProp, replaceParams) {

    const propsText = propsBuilder(componentStyle, replaceParams, additionalProp);
    const componentText = componentStyle.text;

    if (componentText === '' || componentText === undefined) {
        return `<${componentName}${propsText}/>`;
    } else {
        return `<${componentName}${propsText}>${componentText}</${componentName}>`;
    }
}


function propsBuilder(componentStyle, replaceParams, additionalProps) {
    const styleReader = new StyleReader(componentStyle);
    let className = styleReader.className;

    if (replaceParams !== undefined) {
        for (let param of replaceParams) {
            let paramValue = componentStyle[param];
            className = className.replace(`${param}-${paramValue}`, '').trim();
        }
    }

    let additionalText = '';
    if (additionalProps !== undefined) {
        for (let prop of additionalProps) {
            let propValue = componentStyle[prop];
            if (propValue !== undefined) {
                additionalText += ` ${prop}="${propValue}"`;
            }
        }
    }

    if (className === '') {
        return additionalText + '';
    } else {
        return additionalText + ` className="${className}"`;
    }
}
