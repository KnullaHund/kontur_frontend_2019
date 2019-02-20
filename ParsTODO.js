const {
  getAllFilePathsWithExtension,
  readFile
} = require('./fileSystem');

function createTodoList() {
  let filePaths = [],
    todoList = [];
  filePaths = getAllFilePathsWithExtension('./', 'js')
  for (let i = 0; i < filePaths.length; i++) {
    let todoObject = {
      path: filePaths[i],
      body: readFile(filePaths[i])
    };
    todoObject.body = GetNecessaryPoints(todoObject.body);
    todoList.push(todoObject);
  }
  return todoList;
}

function GetNecessaryPoints(fileContent) {
  const todoStart = /\/\/\s{0,}TODO\s{0,}.{1,}\n/ig;
  let todoArray = fileContent.match(todoStart);
  if (!todoArray) return [];

  todoArray = todoArray.map(item => {
    item = item.replace(/\/\/\s*TODO\s*:*/i, '').replace('\n', '');
    return item;
  });

  return todoArray;
}

function makeTodoObjects(path, body) {
  let arrayOfObjects = [];
  body.map(item=>{
    arrayOfObjects.push(createTodoObject(path, item));

  });
  return arrayOfObjects;
}

function makeTodoArray() {
  let todoList = createTodoList(),
  todoArray = [];
  todoList.map(item=>{
    let path = item.path;
    todoArray = todoArray.concat(makeTodoObjects(path, item.body));
  });
  return todoArray;
}

function createTodoObject (path, line){
  let arrayOfParams = line.split(/\s*;\s*/);
  return {
    importance: getImportance(line),
    user: getUserName(arrayOfParams),
    date: getDate (arrayOfParams),
    comment: getComment(arrayOfParams),
    fileName: path.replace('.//', ''),
  }
}

function getImportance(line){
  return line.split('!').length - 1;
}

function getDate(arrayOfParams){
  const validDate = /\d{4}-\d{2}-\d{2}/;
  for (let i = 0; i < arrayOfParams.length; i++){
    if (arrayOfParams[i].search(validDate) != -1){
      return arrayOfParams[i].match(validDate)[0];
    };
  };
  return '';
}

function getUserName(arrayOfParams){
  const validName = /\w{1,}/;
  const validDate = /\d{4}-\d{2}-\d{2}/;
  for (let i = 0; i < arrayOfParams.length - 1; i++){
    if (arrayOfParams[i].search(validDate) != -1){
      continue;
    };
    if (arrayOfParams[i].search(validName) != -1){
      return arrayOfParams[i].match(validName)[0];
    };
  }
  return '';
}

function getComment(arrayOfParams){
  return arrayOfParams[arrayOfParams.length - 1];
}

module.exports = {
  makeTodoArray,
}
