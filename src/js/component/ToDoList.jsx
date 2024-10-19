import React, { useState, useEffect } from "react";
import "../../styles/ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // URL base de la API
  const apiURL = 'https://playground.4geeks.com/todo/user/alesanchezr';

  // Función para obtener las tareas desde la API cuando carga la app
  const fetchTasks = () => {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Error: La respuesta no es un array", data);
        }
      })
      .catch(error => console.error("Error al obtener las tareas", error));
  };
  

  // useEffect para cargar las tareas desde la API al iniciar la app
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para actualizar las tareas en la API
  const updateTasksOnServer = (updatedTasks) => {
    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => fetchTasks()) // Refresca las tareas después de la actualización
      .catch((error) => console.error("Error al actualizar las tareas", error));
  };

  // Función para agregar una tarea
  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const updatedTasks = [...tasks, { label: inputValue, done: false }];
      setTasks(updatedTasks);
      setInputValue("");
      updateTasksOnServer(updatedTasks); // Sincroniza con el servidor
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks); // Sincroniza con el servidor
  };

  // Función para limpiar todas las tareas
  const handleClearTasks = () => {
    const emptyTasks = [];
    setTasks(emptyTasks);
    updateTasksOnServer(emptyTasks); // Sincroniza con el servidor
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        placeholder="Añadir tarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTask}
      />
      <ul className="todo-list">
        {tasks.length === 0 ? (
          <li className="no-tasks">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((task, index) => (
            <li
              className="todo-item"
              key={index}
              onMouseEnter={() =>
                document.getElementById(`delete-${index}`).style.display = "inline"
              }
              onMouseLeave={() =>
                document.getElementById(`delete-${index}`).style.display = "none"
              }
            >
              {task.label}
              <span
                id={`delete-${index}`}
                className="delete-icon"
                onClick={() => handleDeleteTask(index)}
                style={{ display: "none" }} // Inicialmente oculto
              >
                ❌
              </span>
            </li>
          ))
        )}
      </ul>
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={handleClearTasks}>
          Limpiar todas las tareas
        </button>
      )}
    </div>
  );
};

export default ToDoList;
