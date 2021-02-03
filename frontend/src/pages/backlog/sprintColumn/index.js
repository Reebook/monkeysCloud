import React, { memo, useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { Droppable } from 'react-beautiful-dnd';
import Moment from 'react-moment';

import './style.scss';
import PopUp from './popUp';
import SprintTask from '../sprintTask';
import usePlanning from '../../../store/backlog/actions';

const SprintColumn = ({ id, name, startDate, endDate, backlog, tasks, active }) => {
  const { loadTasks } = usePlanning();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [popOver, setPopOver] = useState(null);

  const onToggle = () => setShow(prev => !prev);

  const getData = async () => {
    await loadTasks(id);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = event => {
    setPopOver(event.currentTarget);
  };

  const handleClose = () => {
    setPopOver(null);
  };

  const open = Boolean(popOver);
  const popOverId = open ? 'simple-popover' : undefined;

  if (loading) return null;

  return (
    <div className='sprint-column d-flex flex-column '>
      <div className='d-flex align-items-center'>
        <div className='monkeys-p-2 pointer d-flex align-items-center justify-content-center' onClick={onToggle}>
          {show ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
        </div>
        <div className='monkeys-p-2'>
          <span className='name'>{name}</span>
        </div>
        <span className='text-secondary'>{tasks?.length} issues</span>
        {!backlog && (
          <div className='sprint-options'>
            <button disabled={true} className='outline-button'>
              Start sprint
            </button>
            <button className='outline-button' onClick={handleClick}>
              <BsThreeDots />
            </button>
            <PopUp open={open} id={popOverId} handleClose={handleClose} popOver={popOver} />
          </div>
        )}
      </div>
      {show && (
        <>
          {endDate && startDate && (
            <div className='d-flex align-items-center monkeys-text-gray'>
              <span className='monkeys-p-2 date'>
                <Moment format='MM/DD/YYYY'>{startDate}</Moment>
              </span>
              <span className='monkeys-p-2 date'>~</span>
              <span className='monkeys-p-2 date'>
                <Moment format='MM/DD/YYYY'>{endDate}</Moment>
              </span>
            </div>
          )}
          {!loading && (
            <Droppable droppableId={`${id}-col`}>
              {provided => (
                <div
                  {...provided.droppableProps}
                  key={name}
                  ref={provided.innerRef}
                  className='tasks-row-container d-flex align-items-center flex-column'
                >
                  {tasks?.length ? (
                    tasks.map((task, index) => <SprintTask {...task} index={index} key={`planning-sprint-issue-id-${task.id}`} />)
                  ) : (
                    <>
                      <div className='drag-issues'>
                        <p>Plan a sprint by dragging the sprint footer down below some issues, or by dragging issues here.</p>
                      </div>
                      <button id='create' className='outline-button'>
                        + Create issue
                      </button>
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </>
      )}
    </div>
  );
};

export default SprintColumn;
