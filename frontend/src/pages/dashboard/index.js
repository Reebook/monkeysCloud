import React, { memo, useCallback, useEffect, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import './style.scss';
import BreadCrumb from '../../components/breadcrumb';
import { getProject } from '../../api/projects';
import { getStates } from '../../api/states';
import NewTask from '../../components/newTask';
import NewState from '../../components/newState';
import ProjectColumn from '../../components/projectcolumn';
import { sortColumns, sortTasks } from '../../utils/drapDropSort';
import Spinner from '../../components/spinner';
import SprintSettings from '../../components/sprintSettings';
import User from './User';
import useApi from '../../hooks/useApi';

const userCollection = [
  { id: 1, value: 'Oscar Melendez' },
  { id: 2, value: 'Eduardo Alvarez' },
  { id: 3, value: 'Carlos Gutierrez' },
  { id: 4, value: 'Alejandro Melendez' },
];

const actions = ['Issues', 'Planning', 'Boards', 'Labels', 'Service Desk', 'Reports'];

const Dashboard = () => {
  const [modal, setModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [mode, setMode] = useState('Issues');
  const [state, setState] = useState({
    columns: {},
    columnOrder: [],
    project: {},
    users: [],
    selectedUsers: [],
  });

  const setInitialData = useCallback(
    ([project, states]) => {
      const columns = {};
      const columnOrder = [];
      for (const state of states.data) {
        const columnName = `${state.id}-col`;
        columns[columnName] = { ...state };
        columnOrder.push(columnName);
      }
      const { name, id, key, members: users } = project.data;
      setState({
        ...state,
        columns,
        columnOrder,
        project: { name, id, key },
        users,
      });
    },
    [state]
  );

  const setTasks = useCallback(
    (key, tasks) => {
      const prev = { ...columns };
      prev[key].tasks = tasks;
      setState({ ...state, columns: prev });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  const { id } = useParams();
  const { loading, request } = useApi(() => Promise.all([getProject(id), getStates(id)]), setInitialData);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenModal = useCallback(value => setModal(value), []);
  const isOpen = useCallback(value => (value === modal ? true : false), [modal]);

  if (loading) return <Spinner />;

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    if (type === 'task') {
      const columns = sortTasks(source, destination, { ...state.columns }, 'state');
      setState({ ...state, columns });
      return;
    }

    const newOrder = sortColumns(source.index, destination.index, draggableId, [...state.columnOrder], columns);
    setState({ ...state, columnOrder: newOrder });
  };

  const { columnOrder, columns } = state;

  return (
    <>
      <NewTask openModal={isOpen('newTask')} closeModal={onOpenModal} />
      <SprintSettings openModal={isOpen('newSprint')} closeModal={onOpenModal} />
      <NewState openModal={isOpen('newState')} closeModal={onOpenModal} project={id} />
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
              <button key={i} onClick={() => setMode(action)} className={`project-filter-button ${action === mode ? 'filter-active' : ''} `}>
                {action}
              </button>
            ))}
          </div>
          <div className='project-action-container'>
            <div className='project-mode-name'>
              <h3>Issues</h3>
            </div>
            <div className='project-action-buttons'>
              <button onClick={() => onOpenModal('newTask')}>Add Task</button>
              <button onClick={() => onOpenModal('newSprint')}>Complete Sprint</button>
              <button onClick={() => onOpenModal('newState')}>New State</button>
              <button>Edit Boards</button>
              <button className='ction-button-special'>Share</button>
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
                  <User id={id} value={value} onClick={() => setSelectedUser(id)} style={selectedUser === id ? 'selected-user' : ''} />
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
                      projectId={id}
                      setTasks={tasks => setTasks(columnId, tasks)}
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

export default memo(Dashboard);
