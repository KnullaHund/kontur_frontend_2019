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

function renderTabel(todoArray) {
  settingsCorrector(todoArray);
  let table = createValidHeader(todoArray);
  table += createFooter();
  table += createValidBody(todoArray);
  table += createFooter();
  console.log(table);
}

function settingsCorrector(todoArray) {
  for (let item in SETTINGS) {
    for (let i = 0; i < todoArray.length; i++) {
      let title = String(todoArray[i][item]),
          setting = SETTINGS[item];
      (title.length > setting.max) ?
      (setting.currentMax = 50) :
      (setting.currentMax >= title.length) ?
      (setting.currentMax = setting.currentMax) :
      (setting.currentMax = title.length);
    }
  }
}

function createValidHeader() {
  let validRow = [];
  for (let item in SETTINGS) {
    validRow.push(createHeaderCell(SETTINGS[item], item));
  }
  let validLine = validRow.join(SEPARATORSYMBOL);
  return validLine + '\n';
}

function createHeaderCell(objLine, item) {
  let title = lengthChecker(objLine.customTitle || objLine.propertyName, item);
  return PADDINGSYMBOL.repeat(PADDINGNUMBER) +
    title +
    PADDINGSYMBOL.repeat((objLine.currentMax - title.length) + PADDINGNUMBER);
}

function createValidBody(todoArray) {
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

function createBodyCell(item, todoArray, i) {
  let title = '',
      setting = SETTINGS[item];
  switch (item) {
    case 'importance':
      title = (todoArray[i][item] > 0) ?
        '!' :
        ' ';
      break;
    default:
      title = lengthChecker(todoArray[i][item], item);
      break;
  }
  return PADDINGSYMBOL.repeat(PADDINGNUMBER) +
    title +
    PADDINGSYMBOL.repeat((setting.currentMax - title.length) + PADDINGNUMBER);
}

function createFooter() {
  let amount = 0;
  for (let item in SETTINGS) {
    let setting = SETTINGS[item];
    amount += setting.currentMax + PADDINGNUMBER * 2 + SEPARATORSYMBOL.length;
  };
  return SPACESYMBOL.repeat(amount - SEPARATORSYMBOL.length) + '\n';
}

function lengthChecker(line, item) {
  let setting = SETTINGS[item];
  return (line.length > setting.currentMax) ?
    (line = line.substr(0, 47) + '...') :
    line;
}

module.exports = {
  renderTabel,
}
