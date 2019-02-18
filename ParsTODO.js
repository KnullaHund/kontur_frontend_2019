const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');

function createTodoList() {
  let filePaths = [],
      fileContent,
      todoList = [],
      todoPoints;
  filePaths = getAllFilePathsWithExtension('./' ,'js')
  for (let i = 0; i < filePaths.length; i++){
    fileContent = readFile(filePaths[i]);
    todoPoints = GetNecessaryPoints(fileContent);
    todoList = todoList.concat(todoPoints);
  }
  return filePaths.todoList;
}

function GetNecessaryPoints(fileContent) {
  const todoStart = /\/\/\s*TODO\s*:*/i;
  let nextStringPosition = 0,
      todoPoint,
      todoPoints = [];
  while (fileContent.regExpIndexOf(todoStart, nextStringPosition) !=-1) {
    let todoStartPosition = fileContent.regExpIndexOf(todoStart, nextStringPosition);
    if (-1 != fileContent.indexOf('\n', todoStartPosition)) {
      nextStringPosition = fileContent.indexOf('\n', todoStartPosition);
      todoPoint = CreateTodoPoint(fileContent, nextStringPosition, todoStartPosition);
      todoPoints = todoPoints.concat(todoPoint);
    }
    else {
      nextStringPosition = filecontent.length;
      todoPoint = CreateTodoPoint(fileContent, nextStringPosition, todoStartPosition);
      todoPoints = todoPoints.push(todoPoint);
      break;
    };
  };
  return todoPoints;
}

function CreateTodoPoint(fileContent, nextStringPosition, todoStartPosition) {
  let todoPoint = fileContent.substring(todoStartPosition, nextStringPosition);
  return todoPoint;
}

String.prototype.regExpIndexOf = function(regExp, startPosition) {
  let position = this.substring(startPosition || 0).search(regExp);
  return (position != -1) ? (position + (startPosition || 0)) : position;
}

console.log(createTodoList());
