import { observer } from "mobx-react";
import store from "./Store";

import Task from "./components/Task";
import { useEffect } from "react";

const App = observer(() => {
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      store.setTodoList(JSON.parse(localStorage.getItem("tasks")));
    }
    if (localStorage.getItem("accomplishedTasks")) {
      store.setAccomplishedTasks(
        JSON.parse(localStorage.getItem("accomplishedTasks"))
      );
    }
  }, []);

  const isNotBlank = (str) => {
    return str.trim() !== "";
  };

  const handleChange = (event) => {
    store.setNewTask(event.target.value);
  };

  const addTask = () => {
    if (isNotBlank(store.newTask)) {
      const newTodoList = store.todoList;
      newTodoList.push(store.newTask);
      store.setTodoList(newTodoList);
      store.setNewTask("");
      localStorage.setItem("tasks", JSON.stringify(newTodoList)); // <-- Changed to newTodoList
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="addTask">
        <input type="text" value={store.newTask} onChange={handleChange} onKeyPress={handleKeyPress} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="list">
        {store.todoList.map((task, index) => {
          return <Task task={task} index={index} accomplished={false} />;
        })}
      </div>

      <div className="accomplished">
        <span className="accomplished-text">Завершено</span>
        {store.accomplishedTasks.map((task, index) => {
          return <Task task={task} index={index} accomplished={true} />;
        })}
      </div>
    </div>
  );
});

export default App;
