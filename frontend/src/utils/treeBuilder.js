// treeBuilder читает все пути из файла Hub.js и на основе этих путей строит файловое дерево
const fs = require("fs");
// шаблон для поиска относительного пути к компонентам из Hub.js
const pattern = /\.\/[\w\/]+/g;
let pathsToComponents;
try {
    const data = fs.readFileSync("Hub.js", 'utf-8')
    // перебираем все найденные пути и добавляем им расширения,
    // чтобы все были записаны в одном виде
    pathsToComponents = data.match(pattern).map((item) => {
        if (item.slice(-3, 0) !== ".js") {
            return item += ".js";
        }
    })
} catch (err) {
    console.error(err);
}

let tree = [];
if (pathsToComponents) {
    let definedPaths = [];
    for (let jsFile of pathsToComponents) {
        // разбиваем путь на части и откидываем первые две папки относительного пути - "." и "components",
        // так как эти папки у всех компонентов одинаковые и их нет смысла обрабатывать
        let pathPart = jsFile.split("/").slice(2);
        let currentIndex = 0;
        let fileIndex = pathPart.length - 1;
        let currentPath = "";
        for (let folder of pathPart.slice(0, -1)) {
            currentIndex++;
            currentPath += folder + "/";
            if (!definedPaths.includes(currentPath)) {
                definedPaths.push(currentPath);
                let treeComponent = {
                    "name": folder, "dirs": [],
                    "files": []
                };
                if (currentIndex + 1 !== fileIndex) {
                    treeComponent["dirs"].push(pathPart[currentIndex]);
                } else {
                    let fileName = pathPart[fileIndex];
                    treeComponent["files"].push(fileName);
                }
                tree.push(treeComponent);
            } else {
                // так как tree и definedPaths заполняются одновременно, то индексы компонента
                // в этих массивах будут совпадать
                let treeComponent = tree[definedPaths.indexOf(currentPath)];
                if (currentIndex + 1 < fileIndex) {
                    let dirName = pathPart[currentIndex]
                    if (!treeComponent["dirs"].includes(dirName)) {
                        treeComponent["dirs"].push(dirName);
                    }
                } else {
                    let fileName = pathPart[fileIndex];
                    if (!treeComponent["files"].includes(fileName)) {
                        treeComponent["files"].push(fileName);
                    }
                }
            }
        }
    }
}

try {
    fs.writeFileSync('../tree.json', JSON.stringify(tree));
} catch (err) {
    console.error(err);
}
