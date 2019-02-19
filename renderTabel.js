const {makeTodoArray} = require('./ParsTODO');
const SETTINGS = {
  importance: {
    max: 1,
    currentMax: 1,
    customTitle: '!',
    propertyName: 'importance',
  },
  user: {
    max: 10,
    currentMax: 4,
    propertyName: 'user',
  },
  date: {
    max: 10,
    currentMax: 4,
    propertyName: 'date',
  },
  comment: {
    max: 50,
    currentMax: 7,
    propertyName: 'comment',
  },
  fileName: {
    max: 15,
    currentMax: 8,
    propertyName: 'fileName',
  },
};
const SPACESYMBOL = '-',
      SEPARATORSYMBOL = '|',
      PADDINGSYMBOL = ' ',
      PADDINGNUMBER = 2;

function renderTabel() {
  let validCells = [];
  for (let i = 0; i < SETTINGS.length; i++) {
    (SETTINGS.propertyName == 'importance') ?
    (validCells.push(createCell(SETTINGS[i].customTitle, SETTINGS[i].currentMax))) :
    (validCells.push(createCell(SETTINGS[i].propertyName, SETTINGS[i].currentMax)))
  }
  let validLine = validCells.join(SEPARATORSYMBOL);
  return validLine;
}

function createCell(param, currentMax) {
  let validCell = PADDINGSYMBOL.repeat(PADDINGNUMBER)
  + param
  + PADDINGSYMBOL.repeat(PADDINGNUMBER + (currentMax - param.length));
  return validCell;
}

function renderHeader(SETTINGS) {

}

console.log(renderTabel());
