import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

const User = ({ id, value, onClick, style }) => (
  <div className={'icon-container ' + style} onClick={onClick}>
    <input id={id} type='checkbox' value={value} />
    <FaUserAlt className='user-icon-center' />
  </div>
);

export default User;
