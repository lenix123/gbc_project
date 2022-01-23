
export default function userTreeBuilder(userComponents) {
    let userTree = {Saved: {dirs: new Set(), files: []},
        Buttons: {dirs: new Set(), files: []},
        Cards: {dirs: new Set(), files: []},
        Forms: {dirs: new Set(), files: []},
        Authorization: {dirs: new Set(), files: []}};

    for (let component of userComponents) {
        const type = component.type;
        const prototype = component.prototype;
        const userComponentName = component.component_name;

        if (type === "Authorization") {
            userTree.Forms.dirs.add("Authorization");
            userTree.Saved.dirs.add("Forms")
        } else {
            userTree.Saved.dirs.add(type);
        }

        if (!userTree[type].dirs.has(prototype)) {
            userTree[type].dirs.add(prototype);

            userTree[prototype] = {dirs: [], files: new Array(userComponentName)};
        } else {
            userTree[prototype].files.push(userComponentName);
        }
    }

    return userTree;
}