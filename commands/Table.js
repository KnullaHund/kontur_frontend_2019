const { sortBy, todoByUser, todoWithImportance, todoAfterDate } = require('../sort');
const { renderTabel } = require('../renderTabel');

function Table(todoArray) {
  this.todoArray = todoArray;
  this.show = function (){
    renderTabel(this.todoArray);
  }
  this.onlyImportant = function(){
    this.todoArray = todoWithImportance(this.todoArray);
    return this;
  }
  this.afterDate = function(date){
    this.todoArray = todoAfterDate(this.todoArray, date);
    return this;
  }
  this.byUser = function(user){
    this.todoArray = todoByUser(this.todoArray, user);
    return this;
  }
  this.sortBy = function(param){
    param = param === 'user' ? '-user' : param;
    this.todoArray = sortBy(this.todoArray, param);
    return this;
  }

  return this;
}
 module.exports = {Table};
