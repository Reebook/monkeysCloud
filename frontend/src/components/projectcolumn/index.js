import React, { memo, useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import './style.scss';
import TaskCard from '../taskcard';
import useDashboard from '../../store/dashboard/actions';
import useDimension from '../../hooks/useDimension';

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProjectColumn = ({ columnId, id, name, tasks, index, counter, last }) => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const { getTasks } = useDashboard();
  const { width } = useDimension();
  const load = async () => {
    getTasks(id);
    setLoading(false);
  };

  useEffect(() => {
    if (loading) load();
  });

  if (loading) return null;

  return (
    <Draggable draggableId={columnId} index={index} type='column' isDragDisabled={width < 500 && true}>
      {provided => (
        <div className='project-column' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className='project-column-header'>
            <h5 className='title'>
              {name}
              <span className='badge-counter' style={{ color: getRandomColor() }}>
                {counter}
              </span>
            </h5>
            <div className='accordion-icon-container'>
              <FaCaretDown className='accordion-icon' onClick={() => setShow(!show)} />
            </div>
          </div>
          <Droppable droppableId={columnId} type='task'>
            {provided => (
              <div
                className={`project-tasks-container ${show ? 'show-tasks' : ''} ${last && 'last-column'} `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks?.map((task, index) => (
                  <TaskCard key={task.id} {...task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
export default memo(ProjectColumn);
