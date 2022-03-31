import StyleReader from "./StyleReader";

// функция textBuilder строит текст для вывода на сайте в разделе "Export"
export default function textBuilder(componentName, userComponentName, componentsState, userLibrary) {
    let text;

    const buttons = ["Classic", "Outline", "Waves"];
    const authorization = ["Login", "Email", "Telephone", "Password"];

    let currentComponent, currentLibrary;
    if (userComponentName !== "") {
        currentComponent = userComponentName;
        currentLibrary = userLibrary;
    } else {
        currentComponent = componentName;
        currentLibrary = componentsState;
    }

    if (buttons.includes(componentName)) {
        text = tagBuilder(componentName, currentLibrary[currentComponent]);
    } else if (authorization.includes(componentName)) {
        text = tagBuilder(componentName, currentLibrary[currentComponent]);
    } else if (componentName === "Data") {
        const replaceParams = ["mask"];
        const additionalProp = ["mask"];
        text = tagBuilder("Data", currentLibrary["Data"], additionalProp, replaceParams);
    } else if (componentName === "Card") {
        text = CardText(userComponentName, componentsState, userLibrary);
    } else if (componentName === "Entry") {
        text = EntryText(userComponentName, componentsState, userLibrary);
    } else if (componentName === "BankCard") {
        text = BankCardText(currentLibrary);
    }

    return text;
}


function CardText(userComponentName, componentsState, userLibrary) {
    let componentStyle;
    if (userComponentName !== "") {
        componentStyle = userLibrary[userComponentName];
    } else {
        componentStyle = componentsState["Card"];
    }

    let Button, buttonStyle;
    if (componentStyle.btn === "Initial") {
        Button = componentStyle.initialBtn;
        buttonStyle = componentStyle.btnStyle;
    } else {
        Button = componentStyle.btn || "Classic";
        buttonStyle = componentsState[Button];
    }
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const replaceParams = ["src"];
    const additionalProp = ["src"];
    const propsText = propsBuilder(componentStyle, replaceParams, additionalProp);

    const buttonCode = tagBuilder(Button, buttonStyle);

    return `<Card${propsText}>${componentText}\n\t${buttonCode}\n</Card>`;
}


function EntryText(userComponentName, componentsState, userLibrary) {
    let componentStyle;
    if (userComponentName !== "") {
        componentStyle = userLibrary[userComponentName];
    } else {
        componentStyle = componentsState["Card"];
    }

    let Button, buttonStyle;
    if (componentStyle.btn === "Initial") {
        Button = componentStyle.initialBtn;
        buttonStyle = componentStyle.btnStyle;
    } else {
        Button = componentStyle.btn || "Classic";
        buttonStyle = componentsState[Button];
    }

    let loginFormStyles, passFormStyles, loginType;
    if (userComponentName !== "" && componentStyle.type === "Initial") {
        loginType = componentStyle.initialLogin;
        loginFormStyles = componentStyle.loginStyle;
        passFormStyles = componentStyle.passStyle;
    } else {
        loginType = componentStyle.type || "Email";
        loginFormStyles = componentsState[loginType];
        if (userComponentName !== "") {
            passFormStyles = componentStyle.passStyle;
        } else {
            passFormStyles = componentsState["Password"];
        }
    }

    const sync = componentStyle.sync;
    if (sync === "Login") {
        passFormStyles = loginFormStyles;
    } else if (sync === "Pass") {
        loginFormStyles = passFormStyles;
    }
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const replaceParams = ["btn", "type", "sync"];
    const propsText = propsBuilder(componentStyle, replaceParams);

    const Login = tagBuilder(loginType, loginFormStyles);
    // второе поле в Entry всегда является паролем, поэтому оно отличается только типом
    const Pass = tagBuilder("Password", passFormStyles);

    const buttonCode = tagBuilder(Button, buttonStyle);

    return `<Entry${propsText}>${componentText}\n\t${Login}\n\t${Pass}\n\t${buttonCode}\n</Entry>`;
}


function BankCardText(componentsState) {
    const componentStyle = componentsState["BankCard"];
    const componentText = componentStyle.text ? '\n\t' + componentStyle.text : '';

    const propsText = propsBuilder(componentStyle);
    let dataStyle;
    if (componentStyle.dataStyle !== undefined) {
        dataStyle = componentStyle.dataStyle;
    } else {
        dataStyle = componentsState["Data"];
    }

    const CardNumber = CardForm(dataStyle, "Card Number", "cardNumber");
    const Month = CardForm(dataStyle, "MM", "period");
    const Year = CardForm(dataStyle, "YY", "period");
    const CVV = CardForm(dataStyle, "CVV", "code");

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
        propsText = ' mask="999"' + propsText;
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
