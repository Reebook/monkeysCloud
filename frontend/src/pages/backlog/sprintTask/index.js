import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FaCheckSquare } from 'react-icons/fa';

import './style.scss';
import priorities from '../../../utils/priorities';

const SprintTask = ({ type = 'task', id, name, priority, user, epic }) => {
  return (
    <article className='task-row'>
      <div className='task-row-line' style={{ background: priorities[priority].color }}></div>
      <div className='task-row-name'>
        <FaCheckSquare color='#20A2DA' />
        <span>{name}</span>
      </div>
      <div className='task-row-category' style={{ background: epic?.color, color: 'white' }}>
        {epic?.name}
      </div>
      <div className='task-row-user-info'>
        <Avatar className='avatar' />
        <span>MC-15</span>
        <span className='icon'>{priorities[priority].icon()}</span>
      </div>
    </article>
  );
};

export default SprintTask;
