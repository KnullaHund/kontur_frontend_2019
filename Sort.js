function sortBy (todoArray, property) {
  let order = (property.indexOf('-') > -1) ? (-1) : (1);
  property = property.replace('-', '');
  function sorting (a, b){
    if(!a[property]) return 1;
    if(!b[property]) return -1;
    let result = (String(a[property]).toLowerCase() > String(b[property]).toLowerCase()) ? -1
      : (String(a[property]).toLowerCase() < String(b[property]).toLowerCase()) ? 1 : 0;
    return result * order;
  }
  return todoArray.sort(sorting);
}

function todoByUser (todoArray, user) {
  return todoArray.filter(todoArray => {
  return todoArray.user.toLowerCase() == user.toLowerCase();
    }
  )
}

function todoWithImportance (todoArray) {
  return todoArray.filter(todoArray => {
  return todoArray.importance > 0;
    }
  )
}

function todoAfterDate (todoArray, date) {
  return todoArray.filter(todoArray => {
  return todoArray.date >= date;
    }
  )
}

module.exports = {
  sortBy,
  todoByUser,
  todoWithImportance,
  todoAfterDate,
}
