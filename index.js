const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { makeTodoArray } = require('./parsTodo');
const { sortBy, todoByUser, todoWithImportance, todoAfterDate } = require('./sort');
const { renderTabel } = require('./renderTabel');
const { Table } = require('./commands/Table');

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
    let match = [],
        todoArray = makeTodoArray();
    switch (true) {
        case Boolean(/exit/.exec(command)):
            process.exit(0);
            break;
        case Boolean(/show/.exec(command)):
            Table(todoArray).show();
            break;
        case Boolean(/important/.exec(command)):
            Table(todoArray).onlyImportant().show();
            break;
        case Boolean(/date(\s*){1,}(\d{4}(\-\d{2}(\-\d{2})*)*)/.exec(command)):
            match = command.match(/date(\s*){1,}(\d{4}(\-\d{2}(\-\d{2})*)*)/);
            Table(todoArray).afterDate(match[2]).show();
            break;
        case Boolean(/sort\s((importance)*(user)*(date)*){1}/.exec(command)):
            match = command.match(/sort\s((importance)*(user)*(date)*){1}/);
            Table(todoArray).sortBy(match[1]).show();
            break;
        case Boolean(/user(\s*){1,}\w*/.exec(command)):
            match = command.match(/user(\s*){1,}(\w*)/);
            Table(todoArray).byUser(match[2]).show();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
