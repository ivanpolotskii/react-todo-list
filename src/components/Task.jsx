import React, { useState } from "react";
import store from "../Store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.task);
  const [inputWidth, setInputWidth] = useState(props.task.length);
  const accomplishTask = (taskID) => {
    const newToDoArr = store.todoList;
    const newAccomplishedArr = store.accomplishedTasks;
    newAccomplishedArr.push(newToDoArr[taskID]);
    store.setAccomplishedTasks(newAccomplishedArr);
    deleteTask(taskID,false);
    localStorage.setItem(
      "accomplishedTasks",
      JSON.stringify(newAccomplishedArr)
    );
  };
  const getTaskBack = (taskID) => {
    const newToDoArr = store.todoList;
    const newAccomplishedArr = store.accomplishedTasks;
    newToDoArr.push(newAccomplishedArr[taskID]);
    store.setTodoList(newToDoArr);
    deleteTask(taskID,true);
    localStorage.setItem(
      "tasks",
      JSON.stringify(newToDoArr)
    );
  }
  const deleteTask = (taskID, accomplished) => {
    if (!accomplished) {
      const newArr = store.todoList.filter(
        (task, index) => !(index === taskID)
      );
      store.setTodoList(newArr);
      localStorage.setItem("tasks", JSON.stringify(newArr));
    } else {
      const newArr = store.accomplishedTasks.filter(
        (task, index) => !(index === taskID)
      );
      store.setAccomplishedTasks(newArr);
      localStorage.setItem("accomplishedTasks", JSON.stringify(newArr));
    }
  };
  const changeTask = (taskID, newText) => {
    const updatedTodoList = [...store.todoList];
    updatedTodoList[taskID] = newText;
    store.setTodoList(updatedTodoList);
    localStorage.setItem("tasks", JSON.stringify(updatedTodoList));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
    setInputWidth(event.target.value.length);
  };

  const handleSave = () => {
    setIsEditing(false);
    changeTask(props.index, editedText); // Вызываем функцию changeTask для обновления задачи
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };
  return (
    <div className="task">
      <IconButton className="list_done-icon" color="success">
        {props.accomplished ? (
          <RestoreIcon color="secondary" onClick={() => getTaskBack(props.index)} />
        ) : (
          <DoneIcon onClick={() => accomplishTask(props.index)} />
        )}
      </IconButton>
      {isEditing && !props.accomplished ? (
        <input
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyPress={handleKeyPress}
          style={{ width: `${inputWidth+4}ch` }} // установите ширину равной количеству символов в h1
          autoFocus
        />
      ) : (
        <h1
          onClick={handleEdit}
          style={{
            color: props.accomplished ? "gray" : "inherit",
            textDecoration: props.accomplished ? "line-through" : "inherit",
          }}
        >
          {props.task}
        </h1>
      )}
      <IconButton className="list_delete-icon" color="error">
        <DeleteOutlineIcon
          onClick={() => deleteTask(props.index, props.accomplished)}
        />
      </IconButton>
    </div>
  );
};

export default Task;
