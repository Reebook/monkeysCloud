import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

import './style.scss';

const SprintTask = ({ type = 'task', name, priority, user }) => {
  return (
    <article className='task-row'>
      <div style={{ height: 25, background: 'red', width: 3 }}></div>
      <div className='task-row-name'>
        <FaCheckSquare color='#20A2DA' />
        <span>{name}</span>
      </div>
      <div className='task-row-category'>Users</div>
      <div className='task-row-user-info'></div>
    </article>
  );
};

export default SprintTask;
