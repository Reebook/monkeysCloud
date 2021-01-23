import React, { memo, useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaShareAlt } from 'react-icons/fa';
import { DragDropContext } from 'react-beautiful-dnd';
//import { useForm } from "react-hook-form";

import './style.scss';
import axios from '../../api/axios';
import BreadCrumb from '../../components/breadcrumb';
import NewTask from '../../components/newTask';
import ProjectColumn from '../../components/projectcolumn';
import SprintSettings from '../../components/sprintSettings';
import TaskCard from '../../components/taskcard';
import tasks from './tasks';
import User from './User';

Modal.setAppElement('#root');

const userCollection = [
  { id: 1, value: 'Oscar Melendez' },
  { id: 2, value: 'Eduardo Alvarez' },
  { id: 3, value: 'Carlos Gutierrez' },
  { id: 4, value: 'Alejandro Melendez' },
];

const actions = [
  'Issues',
  'Planning',
  'Boards',
  'Labels',
  'Service Desk',
  'Reports',
];

//mostrar columnas y tareas
const Project = () => {
  const [columns, setColumns] = useState({
    'To do': {
      color: '#FF4900',
      number: 76,
      id: 1,
      tasks: tasks.filter(i => i.state === 'To do'),
    },
    Working: {
      color: '#8798ad',
      number: 69,
      id: 2,
      tasks: tasks.filter(i => i.state === 'Working'),
    },
    Done: {
      color: '#0070ff',
      number: 28,
      id: 3,
      tasks: tasks.filter(i => i.state === 'Done'),
    },
  });

  //formulario para agregar columnas
  const [newState, setNewState] = useState({ name: '' });
  const [selectedUser, setSelectedUser] = useState('');
  const [mode, setMode] = useState('Issues');
  const [openEditBoard, setOpenEditBoard] = useState(false);

  useEffect(() => {}, []);

  const handleFormChange = event => {
    setNewState({
      ...newState,
      [event.target.name]: event.target.value,
    });
  };

  /*Open PopUp*/
  const [isOpen, setIsOpen] = useState(false);
  const togglePopUp = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  /*Close PopUp*/
  const [completeSprint, setCompleteSprint] = useState(false);

  const handleSubmit = () => {
    axios
      .post('State/Create', newState)
      .then(res => {
        console.log('Done!', res.data);
      })
      .catch(error => console.log(error));
  };

  //código original que se encarga de actualizar la posición de las tareas en las columnas
  //ahora el que trae las columnas desde la bd es: const [pStates, setPStates] = useState([]);
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...columns[source.droppableId].tasks[source.index] };
    itemCopy.state = destination.droppableId;
    setColumns(prev => {
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
    assignee => {
      if (selectedUser) {
        if (selectedUser === assignee) return true;
        else return false;
      }
      if (!selectedUser) return true;
    },
    [selectedUser]
  );

  return (
    <>
      <SprintSettings
        openModal={completeSprint}
        closeModal={() => setCompleteSprint(false)}
      />
      <div className='manage-page monkeys-p-5'>
        <div className='project-header'>
          <BreadCrumb />
          <div className='monkeys-p-1'>
            <span className='project-type'>Public</span>
          </div>
          <div className='project-enviroment-buttons'>
            <button className='env-button'>All Enviroment</button>
            <button className='env-button env-active'>Dev Enviroment</button>
          </div>
        </div>
        <div className='project-filter-container'>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => setMode(action)}
              className={`project-filter-button ${
                action === mode ? 'filter-active' : ''
              } `}
            >
              {action}
            </button>
          ))}
        </div>
        <div className='project-action-container'>
          <div className='project-mode-name'>
            <h3>Issues</h3>
          </div>
          <div className='user-filter'>
            <ul>
              {userCollection.map(({ id, value }, i) => (
                <li key={i}>
                  <User
                    id={id}
                    value={value}
                    onClick={() => setSelectedUser(id)}
                    style={selectedUser === id ? 'selected-user' : ''}
                  />
                </li>
              ))}
              <li
                className='li-clear pointer'
                onClick={() => setSelectedUser('')}
              >
                clear all
              </li>
            </ul>
          </div>
          {/*
              ---------------------------end user fields--------------------------------
          */}
          <div className='project-action-buttons'>
            <button onClick={togglePopUp}>Add Task</button>
            {isOpen && <NewTask handleClose={togglePopUp} />}
            <button>Complete Sprint</button>
            <button>Edit Boards</button>
            {/* <button className='ction-button-special'>Share</button> */}
            <FaShareAlt
              style={{ color: '#15225a', fontSize: '32px', margin: 'auto 6px' }}
            />
          </div>
        </div>
        <div className='project-tasks'>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(columns).map((i, index) => (
              <ProjectColumn title={i} {...columns[i]} key={index}>
                {columns[i].tasks.map((task, i) => (
                  <TaskCard
                    {...task}
                    key={i}
                    index={i}
                    visible={setVisible(task.assignee)}
                  />
                ))}
              </ProjectColumn>
            ))}
          </DragDropContext>
        </div>
        <Modal
          isOpen={openEditBoard}
          onRequestClose={() => setOpenEditBoard(false)}
          style={{
            overlay: {
              position: 'fixed',
              top: '40%',
              left: '60%',
              right: '5%',
              bottom: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
            },
          }}
        >
          <nav className='menuBoard'>
            <ul className='monkeys-menu-container'>
              <li className='monkeys-p-2 pointer'>Add Column</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                name='name'
                type='text'
                placeholder='Column Name'
                value={newState.name}
                onChange={handleFormChange}
              ></input>
              <button type='submit'>Add</button>
            </form>

            <div>
              <button onClick={() => setOpenEditBoard(false)}>Close</button>
            </div>
          </nav>
        </Modal>
      </div>
    </>
  );
};

export default memo(Project);
