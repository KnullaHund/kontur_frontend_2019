const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { makeTodoArray } = require('./parsTodo');
const { sortBy, todoByUser, todoWithImportance, todoAfterDate } = require('./sort');
const { renderTabel } = require('./renderTabel');

app();

function app () {
    const files = getFiles();

    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand (command) {
    let match = [];
    switch (true) {
        case Boolean(/exit/.exec(command)):
            process.exit(0);
            break;
        case Boolean(/show/.exec(command)):
            renderTabel(makeTodoArray());
            break;
        case Boolean(/important/.exec(command)):
            renderTabel(todoWithImportance(makeTodoArray()));
            break;
        case Boolean(/date(\s*){1,}(\d{4}(\-\d{2}(\-\d{2})*)*)/.exec(command)):
            match = command.match(/date(\s*){1,}(\d{4}(\-\d{2}(\-\d{2})*)*)/);
            renderTabel(todoAfterDate(makeTodoArray(), match[2]));
            break;
        case Boolean(/sort\s((importance)*(user)*(date)*){1}/.exec(command)):
            match = command.match(/sort\s((importance)*(user)*(date)*){1}/);
            renderTabel(makeTodoArray().sort(sortBy(match[1])));
            break;
        case Boolean(/user(\s*){1,}\w*/.exec(command)):
            match = command.match(/user(\s*){1,}(\w*)/);
            renderTabel(todoByUser(makeTodoArray(), match[2]));
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
