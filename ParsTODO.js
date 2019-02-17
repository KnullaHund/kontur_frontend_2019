const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');

function CreateTodoList() {
  let filePaths = getAllFilePathsWithExtension('./' ,'js'),
      fileContent,
      todoList = [],
      todoPoints;
  for (let i = 0; i < filePaths.length; i++){
    fileContent = readFile(filePaths[i]);
    todoPoints = GetNecessaryPoints(fileContent);
    todoList = todoList.concat(todoPoints);
  }
  return todoPoints;
}

function GetNecessaryPoints(fileContent) {
  const todostart = /\/\/\s*TODO\s*:*/i;
  let nextStringPosition = 0,
      todoPoint,
      todoPoints = [];
  while (fileContent.indexOf(todostart, nextStringPosition) !=-1) {
    let todoStartPosition = fileContent.indexOf(todostart, nextStringPosition);
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
  todoPoint = fileContent.slice(todoStartPosition, nextStringPosition);
  return todoPoint;
}

console.log(CreateTodoList());
