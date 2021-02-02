import React, { memo, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import Moment from 'react-moment';

import './style.scss';
import PopUp from './popUp';
import SprintTask from '../sprintTask';

const SprintColumn = ({ name, startDate, endDate, tasks = [], backlog }) => {
  const [show, setShow] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const onToggle = () => setShow(prev => !prev);
  const onOpenPopUp = () => {
    console.log(popUp);
    setPopUp(!popUp);
  };

  const closePopUp = () => setPopUp(false);

  return (
    <div className='sprint-column d-flex flex-column monkeys-p-3'>
      <div className='d-flex align-items-center'>
        <div className='monkeys-p-2 pointer d-flex align-items-center justify-content-center' onClick={onToggle}>
          {show ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
        </div>
        <div className='monkeys-p-2'>
          <span className='name'>{name}</span>
        </div>
        <span className='text-secondary'>{tasks.length} issues</span>
        {!backlog && (
          <div className='sprint-options'>
            <button className='outline-button' onClick={onOpenPopUp}>
              <BsThreeDots />
            </button>
            <PopUp open={popUp} close={closePopUp} />
          </div>
        )}
      </div>
      {show && (
        <>
          {endDate && startDate && (
            <div className='d-flex align-items-center monkeys-text-gray'>
              <span className='monkeys-p-2 date'>
                <Moment format='DD/MM/YYYY'>{startDate}</Moment>
              </span>
              <span className='monkeys-p-2 date'>~</span>
              <span className='monkeys-p-2 date'>
                <Moment format='DD/MM/YYYY'>{endDate}</Moment>
              </span>
            </div>
          )}
          <div className='tasks-row-container d-flex align-items-center flex-column'>
            {tasks.length ? (
              tasks.map(task => <SprintTask {...task} key={`planning-sprint-issue-id-${task.id}`} />)
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
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SprintColumn);
