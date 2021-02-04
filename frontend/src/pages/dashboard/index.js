import React, { memo, useEffect, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import './style.scss';
import BreadCrumb from '../../components/breadcrumb';
import NewTask from '../../components/newTask';
import NewState from '../../components/newState';
import ProjectColumn from '../../components/projectcolumn';
import Spinner from '../../components/spinner';
import SprintSettings from '../../components/sprintSettings';
import User from './User';
import useDashboard from '../../store/dashboard/actions';

const userCollection = [
  { id: 1, value: 'Oscar Melendez' },
  { id: 2, value: 'Eduardo Alvarez' },
  { id: 3, value: 'Carlos Gutierrez' },
  { id: 4, value: 'Alejandro Melendez' },
];

const actions = ['Issues', 'Planning', 'Boards', 'Labels', 'Service Desk', 'Reports'];

const Project = () => {
  const { id } = useParams();
  const {
    getData,
    onDragEnd,
    openModal,
    state: { columns, columnOrder, loading, sprintModal, newStateModal, newTaskModal },
  } = useDashboard();

  const [selectedUser, setSelectedUser] = useState('');
  const [mode, setMode] = useState('Issues');

  useEffect(() => {
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <>
      <NewTask openModal={newTaskModal} closeModal={() => openModal('newTaskModal')} />
      <SprintSettings openModal={sprintModal} closeModal={() => openModal('sprintModal')} />
      <NewState openModal={newStateModal} closeModal={() => openModal('newStateModal')} project={id} />
      <div className='dashboard-page'>
        <div className='dashboard-page__header'>
          <div className='project-header'>
            <div className='project-header__top'>
              <BreadCrumb />
              <div className='monkeys-p-1'>
                <span className='project-type'>Public</span>
              </div>
              <div className='project-enviroment-buttons'>
                <button className='env-button'>All Enviroment</button>
                <button className='env-button env-active'>Dev Enviroment</button>
              </div>
            </div>
          </div>
          <div className='project-filter-container'>
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={() => setMode(action)}
                className={`project-filter-button ${action === mode ? 'filter-active' : ''} `}
              >
                {action}
              </button>
            ))}
          </div>
          <div className='project-action-container'>
            <div className='project-mode-name'>
              <h3>Issues</h3>
            </div>
            <div className='project-action-buttons'>
              <button onClick={() => openModal('newTaskModal')}>Add Task</button>
              <button onClick={() => openModal('sprintModal')}>Complete Sprint</button>
              <button onClick={() => openModal('newStateModal')}>New State</button>
              <button>Edit Boards</button>
              {/* <button className='ction-button-special'>Share</button> */}
              <FaShareAlt
                style={{
                  color: '#15225a',
                  fontSize: '32px',
                  margin: 'auto 6px',
                }}
              />
            </div>
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
              <li className='li-clear pointer' onClick={() => setSelectedUser('')}>
                clear all
              </li>
            </ul>
          </div>
        </div>
        <div className='dashboard-page__content'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='all-column' type='column' direction='horizontal'>
              {provided => (
                <div className='project-columns-container' {...provided.droppableProps} ref={provided.innerRef}>
                  {columnOrder.map((columnId, index) => (
                    <ProjectColumn
                      {...columns[columnId]}
                      columnId={columnId}
                      index={index}
                      key={columns[columnId].id}
                      counter={columns[columnId].tasks.length}
                      last={columnOrder.length - 1 === index ? true : false}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default memo(Project);
