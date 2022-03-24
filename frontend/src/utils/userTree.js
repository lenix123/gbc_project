export default function userTreeBuilder(userComponents) {
    let userTree = {Saved: {dirs: new Set(), files: []},
        Buttons: {dirs: new Set(), files: []},
        Cards: {dirs: new Set(), files: []},
        Forms: {dirs: new Set(), files: []},
        Authorization: {dirs: new Set(), files: []}};

    let userComponentsList = [];

    for (let component of userComponents) {
        const type = component.type;
        const prototype = component.prototype;
        const userComponentName = component.component_name;

        userComponentsList.push(userComponentName);

        if (type === "Authorization") {
            userTree.Forms.dirs.add("Authorization");
            userTree.Saved.dirs.add("Forms")
        } else {
            userTree.Saved.dirs.add(type);
        }

        if (!userTree[type].dirs.has(prototype)) {
            userTree[type].dirs.add(prototype);

            userTree[prototype] = {dirs: new Set(), files: new Array(userComponentName+".js")};
        } else {
            userTree[prototype].files.push(userComponentName+".js");
        }
    }

    return [userTree, userComponentsList];
}


export function determineType(componentName) {
    const types = {
        Buttons: ["Classic", "Outline", "Waves"],
        Cards: ["Card"],
        Forms: ["Data", "Entry", "BankCard"],
        Authorization: ["Email", "Login", "Password", "Telephone"]
    }

    for (let type of Object.keys(types)) {
        if (types[type].includes(componentName)) {
            return type;
        }
    }
}