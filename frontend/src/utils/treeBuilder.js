// treeBuilder reads all paths from Hub.js and builds file tree for sidebar
// After you add new component in Hub.js, you must run treeBuilder
const fs = require("fs");
// path pattern
const pattern = /\.\/[\w\/]+/g;
let pathsToComponents;
try {
    const data = fs.readFileSync("Hub.js", 'utf-8')

    pathsToComponents = data.match(pattern).map((item) => {
        if (item.slice(-3) !== ".js") {
            return item += ".js";
        }
    })
} catch (err) {
    console.error(err);
}

// default tree
let tree = {Library: {dirs: new Set(), files: []},
    Buttons: {dirs: new Set(), files: []},
    Cards: {dirs: new Set(), files: []},
    Forms: {dirs: new Set(), files: []},
    Authorization: {dirs: new Set(), files: []}};

if (pathsToComponents.length) {

    for (let jsFile of pathsToComponents) {
        // all paths have the same 3 first dirs - "..", "components", "Library",
        // so we don't consider them
        let pathDirs = jsFile.split("/").slice(3);
        let type;

        for (let dir of pathDirs) {
            // if dir is type
            if (["Buttons", "Cards", "Forms"].includes(dir)) {
                type = dir;
                tree.Library.dirs.add(dir);
            // Authorization is different, because it is located inside of Forms
            } else if (dir === "Authorization") {
                type = dir;
                tree.Forms.dirs.add(dir);
            // if dir is file
            } else if (dir.slice(-3) === '.js') {
                tree[type].files.push(dir);
            }
        }
    }

    // turn sets into arrays, because we use JSON for writing
    for (let key in tree) {
        tree[key].dirs = Array.from(tree[key].dirs);
    }
}

// write tree in "../tree.json"
try {
    fs.writeFileSync('../tree.json', JSON.stringify(tree));
} catch (err) {
    console.error(err);
}
