import React, { memo, useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { FaShareAlt } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import './style.scss';
import Breadcrumb from '../../components/breadcrumb';
import EditTask from './editTask';
import { getSprints } from '../../api/sprints';
import MainFilter from './mainFilter';
import NewSprint from '../../components/newSprint';
import { sortTasks } from '../../utils/drapDropSort';
import Spinner from '../../components/spinner';
import SprintColumn from './sprintColumn';
import useApi from '../../hooks/useApi';

const backlog = {
  id: 0,
  name: 'backlog',
};

const Backlog = () => {
  const [state, setState] = useState({
    sprints: {},
    selectedTask: true,
  });
  const [modal, setModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onOpenModal = useCallback(() => setModal(true), [modal]);

  const setInitialData = useCallback(
    data => {
      const sprints = {};
      for (const item of data) {
        sprints[`${item.id}-col`] = { ...item };
      }
      Object.assign(sprints, { '0-col': backlog });
      setState({ ...state, sprints });
    },
    [state]
  );

  const setTasks = useCallback(
    (key, tasks) => {
      const prev = { ...state.sprints };
      prev[key].tasks = tasks;
      setState({ ...state, columns: prev });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.sprints]
  );

  const { id } = useParams();
  const { request, loading } = useApi(getSprints, setInitialData);

  useEffect(() => {
    request(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;
    const columns = sortTasks(source, destination, { ...state.sprints }, 'sprint');
    setState({ ...state, columns });
  };

  if (loading) return null;

  const { sprints } = state;
  return (
    <>
      <NewSprint openModal={modal} closeModal={onOpenModal} project={id} />
      <div className='planning'>
        <>
          <div className='project-header'>
            <Breadcrumb />
          </div>
          <div className='planning__header'>
            <h3>Planning</h3>
            <div className='options-container'>
              <button className='outline-button' onClick={onOpenModal}>
                Create Sprint
              </button>
              <button className='outline-button'>
                <FaShareAlt className='icon icon-share' /> Share
              </button>
              <button className='outline-button'>
                <BsThreeDots className='icon' />
              </button>
            </div>
          </div>
          <MainFilter />
        </>
        <div className='planning__content'>
          <div className='sprint-column-container'>
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.keys(sprints).map((i, index) => (
                <SprintColumn {...sprints[i]} key={index} setTasks={data => setTasks(i, data)} />
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Backlog);
