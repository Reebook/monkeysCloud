import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const SprintColumn = ({ name, tasks }) => {
  const [show, setShow] = useState(true);
  const onToggle = () => setShow(prev => !prev);
  return (
    <div className='d-flex flex-column monkeys-p-3'>
      <div className='d-flex align-items-center'>
        <div className='monkeys-p-2 pointer d-flex align-items-center justify-content-center' onClick={onToggle}>
          {show ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
        </div>
        <div className='monkeys-p-2'>
          <span className='font-weight-bold'>{name}</span>
        </div>
        <span className='monkeys-text-gray'>{tasks.length} issues</span>
      </div>
    </div>
  );
};

export default SprintColumn;
