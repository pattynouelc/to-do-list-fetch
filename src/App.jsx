import React from "react";
import ReactDOM from "react-dom/client";
import ToDoList from "./js/component/ToDoList";
import "./styles/ToDoList.css"; // Puedes incluir estilos generales

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<ToDoList />);
