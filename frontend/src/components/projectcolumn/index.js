import React, { memo, useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import './style.scss';
import { getTasks } from '../../api/tasks';
import TaskCard from '../taskcard';
import useApi from '../../hooks/useApi';
import useDimension from '../../hooks/useDimension';

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProjectColumn = ({ columnId, id, name, tasks, index, last, setTasks }) => {
  const [hide, setHide] = useState(false);
  const { width } = useDimension();
  const { loading, request } = useApi(getTasks, setTasks);

  useEffect(() => {
    request({ state: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return null;

  return (
    <Draggable draggableId={columnId} index={index} type='column' isDragDisabled={width < 500 && true}>
      {provided => (
        <div className='project-column' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className='project-column-header'>
            <h5 className='title'>
              {name}
              <span className='badge-counter' style={{ color: getRandomColor() }}>
                {tasks?.length}
              </span>
            </h5>
            <div className='accordion-icon-container'>
              <FaCaretDown className='accordion-icon' onClick={() => setHide(!hide)} />
            </div>
          </div>
          <Droppable droppableId={columnId} type='task'>
            {provided => (
              <div
                className={`project-tasks-container ${hide ? 'show-tasks' : ''} ${last && 'last-column'} `}
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
