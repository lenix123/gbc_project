export function emailValid(email) {
    const emailPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // return error text
    if (emailPattern.test(email)) {
        return "";
    } else if (email === "") {
        return "This is a required field";
    } else {
        return "Incorrect email address";
    }
}


export function passwordsValid(password) {
 //    Passwords must be
 // * - At least 8 characters long, max length anything
 // * - Include at least 1 lowercase letter
 // * - 1 capital letter
 // * - 1 number
    const passwordPattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/;
    if (passwordPattern.test(password)) {
        return "";
    } else if (password === "") {
        return "This is a required field";
    } else {
        return "This password is too simple";
    }
}


export function matchPassValid(password1, password2) {
    if (password2 === "") {
        return "This is a required field";
    } else if (password2 === password1) {
        return "";
    } else {
        return "These passwords do not match";
    }
}