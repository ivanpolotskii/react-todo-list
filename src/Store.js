import { observable, action, makeObservable } from 'mobx';

class Store{
  todoList = [];
  newTask = "";
  accomplishedTasks = [];
  constructor(){
    makeObservable(this,{
      todoList:observable,
      newTask:observable,
      accomplishedTasks:observable,
      setTodoList:action,
      setNewTask:action,
      setAccomplishedTasks:action,
    })
  }
  setTodoList(value){
    this.todoList = value;
  }
  setNewTask(value){
    this.newTask = value;
  }
  
  setAccomplishedTasks(value){
    this.accomplishedTasks = value;
  }
}

const store = new Store();
export default store;