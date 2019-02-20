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

function settingsCorrector(todoArray) {
  for (let item in SETTINGS) {
    for (let i = 0; i < todoArray.length; i++) {
      let title = String(todoArray[i][item]);
      (title.length > SETTINGS[item].max) ?
      (SETTINGS[item].currentMax = 50) :
      (SETTINGS[item].currentMax >= title.length) ?
      (SETTINGS[item].currentMax = SETTINGS[item].currentMax) :
      (SETTINGS[item].currentMax = title.length);
    }
  }
}

function createValidHeader() {
  let validRow = [];
  for (let item in SETTINGS) {
    validRow.push(createHeaderCell(SETTINGS[item], item));
  }
  let validLine = validRow.join(SEPARATORSYMBOL);
  return validLine;
}

function createHeaderCell(objLine, item){
  let title = lengthChecker(objLine.customTitle || objLine.propertyName, item);
  return PADDINGSYMBOL.repeat(PADDINGNUMBER)
   + title
   + PADDINGSYMBOL.repeat((objLine.currentMax - title.length) + PADDINGNUMBER);
}

function createValidBody(todoArray){
  let validRow = [];
  let validLines = '';
  for (let i = 0; i < todoArray.length; i++) {
    for (let item in todoArray[i]) {
      validRow.push(createBodyCell(item, todoArray, i))
    }
    validLines = validLines + validRow.join(SEPARATORSYMBOL) + '\n';
    validRow = [];
  }
  return validLines;
}

function createBodyCell(item, todoArray, i){
  let title ='';
  switch(item) {
    case 'importance':
      title = (todoArray[i][item] > 0) ?
      '!' :
      ' ';
       break;
    default:
      title = lengthChecker(todoArray[i][item], item);
      break;
  }
  return PADDINGSYMBOL.repeat(PADDINGNUMBER)
    + title
    + PADDINGSYMBOL.repeat((SETTINGS[item].currentMax - title.length) + PADDINGNUMBER);
}

function createFooter() {
  let amount = 0;
  for (let item in SETTINGS) {
    amount += SETTINGS[item].currentMax + PADDINGNUMBER*2 + SEPARATORSYMBOL.length;
  };
  return SPACESYMBOL.repeat(amount - SEPARATORSYMBOL.length);
}

function renderTabel(todoArray) {
  settingsCorrector(todoArray);
  let table = createValidHeader(todoArray) + '\n';
  table +=   createFooter() + '\n';
  table +=   createValidBody(todoArray);
  table +=   createFooter();
  console.log(table);
}

function lengthChecker(line, item) {
  return (line.length > SETTINGS[item].currentMax) ?
  (line = line.substr(0, 47) + '.' + '.' + '.') :
  line;
}

module.exports = {
  renderTabel,
}
