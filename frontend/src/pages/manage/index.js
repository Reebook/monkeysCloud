import React, { memo, useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { FaUserAlt } from "react-icons/fa";
import { DragDropContext } from "react-beautiful-dnd";
//import { useForm } from "react-hook-form";

import axios from "../../api/axios";

import "./style.scss";
import BreadCrumb from "../../components/breadcrumb";
import ProjectColumn from "../../components/projectcolumn";
import TaskCard from "../../components/taskcard";
import tasks from "./tasks";

Modal.setAppElement("#root");

const userCollection = [
  { id: 1, value: "Oscar Melendez" },
  { id: 2, value: "Eduardo Alvarez" },
  { id: 3, value: "Carlos Gutierrez" },
  { id: 4, value: "Alejandro Melendez" },
];

const actions = [
  "Issues",
  "Planning",
  "Boards",
  "Labels",
  "Service Desk",
  "Reports",
];

//mostrar columnas y tareas
const Project = () => {
  const [pStates, setPStates] = useState([]);
  useEffect(() => {
    getStates();
  }, []);
  const getStates = () => {
    axios
      .get("State/ReadAll")
      .then((res) => {
        const allStates = res.data;
        setPStates(allStates);
      })
      .catch((error) => console.log(error));
  };

  //formulario para agregar columnas
  const [newState, setNewState] = useState({ name: "" });
 // const { register, errors, handleSubmit } = useForm();

      const handleFormChange = event => {
        // use spread operator
        setNewState({
            ...newState,
            [event.target.name]: event.target.value,
        });
        };

  const handleSubmit = (event) => {
    axios.post("State/Create",newState ).then((res)=>{console.log('Done!', res.data);}).catch((error) => console.log(error));
  };


  const [columns, setColumns] = useState({
    "To do": {
      color: "#FF4900",
      number: 76,
      id: 1,
      tasks: tasks.filter((i) => i.state === "To do"),
    },
    Working: {
      color: "#8798ad",
      number: 69,
      id: 2,
      tasks: tasks.filter((i) => i.state === "Working"),
    },
    Done: {
      color: "#0070ff",
      number: 28,
      id: 3,
      tasks: tasks.filter((i) => i.state === "Done"),
    },
  });
  const [selectedUser, setSelectedUser] = useState("");
  const [mode, setMode] = useState("Issues");
  const [openEditBoard, setOpenEditBoard] = useState(false);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...pStates[source.droppableId].tasks[source.index] };
    itemCopy.state = destination.droppableId;
    setPStates((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].tasks.splice(source.index, 1);
      // Adding to new items array location
      prev[destination.droppableId].tasks.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  const setVisible = useCallback(
    (assignee) => {
      if (selectedUser) {
        if (selectedUser === assignee) return true;
        else return false;
      }
      if (!selectedUser) return true;
    },
    [selectedUser]
  );

  return (
    <div className="manage-page monkeys-p-5">
      <div className="project-header">
        <BreadCrumb />
        <div className="monkeys-p-1">
          <span className="project-type">Public</span>
        </div>
        <div className="project-enviroment-buttons">
          <button className="env-button">All Enviroment</button>
          <button className="env-button env-active">Dev Enviroment</button>
        </div>
      </div>
      <div className="project-filter-container">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => setMode(action)}
            className={`project-filter-button ${
              action === mode ? "filter-active" : ""
            } `}
          >
            {action}
          </button>
        ))}
      </div>
      <div className="project-action-container">
        <div className="project-mode-name">
          <h3>Issues</h3>
        </div>
        {/*
          ---------------------------user fields---------------------------------
        */}
        <div className="user-filter">
          <ul>
            {userCollection.map(({ id, value }, i) => (
              <li key={i}>
                <UserIcon
                  id={id}
                  value={value}
                  onClick={() => setSelectedUser(id)}
                  style={selectedUser === id ? "selected-user" : ""}
                />
              </li>
            ))}
            <li
              className="li-clear pointer"
              onClick={() => setSelectedUser("")}
            >
              clear all
            </li>
          </ul>
        </div>
        {/*
            ---------------------------end user fields--------------------------------
        */}

        <div className="project-action-buttons">
          <button>Complete Sprint</button>
          <button className="ction-button-special">Share</button>
          <button onClick={() => setOpenEditBoard(!openEditBoard)}>
            Edit Boards
          </button>
        </div>
        <Modal
          isOpen={openEditBoard}
          onRequestClose={() => setOpenEditBoard(false)}
          style={{
            overlay: {
              position: "fixed",
              top: "40%",
              left: "60%",
              right: "5%",
              bottom: 100,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <nav className="menuBoard">
            <ul className="monkeys-menu-container">
              <li className="monkeys-p-2 pointer">Add Column</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Column Name"
                value={newState.name}
                onChange={handleFormChange}
              ></input>
              <button type="submit">Add</button>
            </form>

            <div>
              <button onClick={() => setOpenEditBoard(false)}>Close</button>
            </div>
          </nav>
        </Modal>
      </div>

      <div className="project-tasks">
        <DragDropContext onDragEnd={onDragEnd}>
          {pStates.map((col, index) => (
            <ProjectColumn id={col.id} name={col.name} key={col.id}>
              {pStates[index].taskState.map((task, i) => (
                <TaskCard
                  {...task}
                  key={task.id}
                  index={i}
                  visible={setVisible(task.assignee)}
                />
              ))}
            </ProjectColumn>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
//linea para mostrar states
//pStates.map((col, index)=>(<projectcolumn key={index} value={col.id}>{col.name}</projectcolumn>))
const UserIcon = ({ id, value, onClick, style }) => {
  return (
    <div className={"icon-container " + style} onClick={onClick}>
      <input id={id} type="checkbox" value={value} />
      <FaUserAlt className="user-icon-center" />
    </div>
  );
};

export default memo(Project);
