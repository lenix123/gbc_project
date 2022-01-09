export function maskForData(e, pattern) {
    let input = e.target,
        selectionStart = input.selectionStart;

    input.maxLength = pattern.length;

    let absoluteValue = getAbsoluteValue(input.value);

    if (!absoluteValue) {
        return input.value = "";
    }

    if (input.value.length !== selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = absoluteValue;
        }
        return;
    }

    maskMatcher(input, pattern);
}

function maskMatcher(input, pattern) {
    const currentLength = input.value.length;
    const previousStroke = input.value.slice(0, currentLength-1);
    const newSymbol = input.value[currentLength-1];

    switch (pattern[currentLength-1]) {
        case "9":
            // the value belongs to 0-9
            input.value = previousStroke + numberChecker(newSymbol);
            break;
        case "a":
            // the value belongs to A-Z, a-z
            input.value = previousStroke + letterChecker(newSymbol);
            break;
        case "*":
            // the value belongs to 0-9, A-Z, a-z
            input.value = previousStroke + getAbsoluteValue(newSymbol);
            break;
        default:
            // splitter
            input.value = previousStroke + pattern[currentLength-1] + newSymbol;
            maskMatcher(input, pattern);
            break;
    }
}

function getAbsoluteValue(value) {
    return value.replace(/[\W_]/g, "");
}

function numberChecker(sym) {
    return sym.replace(/\D/, "");
}

function letterChecker(sym) {
    return sym.replace(/[\d\W_]/, "");
}


export function dataKeyDown(e, mask) {
    let input = e.target;
    if (e.keyCode === 8) {
        const currentLength = input.value.length;
        if (currentLength > 1) {
            const maskSymbol = mask[currentLength-2]

            if (!["9", "a", "*"].includes(maskSymbol)) {
                input.value = input.value.slice(0, currentLength-1);
                dataKeyDown(e, mask);
            }
        }
    }
}


export function dataPaste(e, mask) {
    let pasted = e.clipboardData || window.clipboardData,
        input = e.target;

    if (pasted) {
        let pastedText = pasted.getData("Text");
        for (let symbol of pastedText) {
            input.value += symbol;
            maskForData(e, mask);
        }
    }
}