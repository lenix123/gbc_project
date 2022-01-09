export function phoneinput(e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        formattedInputValue = "",
        selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
        return input.value = "";
    }

    if (input.value.length !== selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].includes(inputNumbersValue[0])) {
        // Russian phone number
        if (inputNumbersValue === "9") {
            inputNumbersValue = "7" + inputNumbersValue;
        }
        let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
        formattedInputValue = firstSymbols + " ";
        let numbersCount = inputNumbersValue.length;
        if (numbersCount > 1) {
            formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
        }
        if (numbersCount >= 5) {
            formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
        }
        if (numbersCount >= 8) {
            formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
        }
        if (numbersCount >= 10) {
            formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
        }
    } else {
        // Not russian phone number
        formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
}

function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, "");
}


export function phoneKeyDown(e) {
    let input = e.target;
    if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = "";
    }
}

export function phonePaste(e) {
    let pasted = e.clipboardData || window.clipboardData,
        input = e.target,
        inputNumberValue = getInputNumbersValue(input);

    if (pasted) {
        let pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
            input.value = inputNumberValue;
        }
    }
}