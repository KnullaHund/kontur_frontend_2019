function sortBy (property) {
  return function(a, b){
    if(!a[property]) return 1;
    if(!b[property]) return -1;
    var result = (a[property].toLowerCase() > b[property].toLowerCase()) ? 1
      : (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : 0;
    return result;
  }
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
