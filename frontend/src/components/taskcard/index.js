// Third libs
import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaCheckSquare, FaCommentAlt } from 'react-icons/fa';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
// Local
import './style.scss';

const priorityColors = {
  1: '#23CC55',
  2: '#085820',
  3: '#E5762A',
  4: '#F7141C',
};

const TaskCard = ({ id, name, priority, index, state, type }) => {
  const history = useHistory();
  const getStyle = dragStyle => ({
    borderLeftColor: priorityColors[priority],
    ...dragStyle,
  });

  let PriorityComponent;
  if (priority > 2) PriorityComponent = HiArrowUp;
  else PriorityComponent = HiArrowDown;

  return (
    <Draggable draggableId={id.toString()} index={index} type='task'>
      {provided => (
        <div
          className='task-card pointer'
          onClick={() => history.push(`/task-detail/${id}`)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style)}
        >
          <div className='task-card-top'>
            <h4>{name}</h4>
            <h4>{state}</h4>
          </div>
          <div className='task-card-bottom'>
            <p>
              {type === 'task' ? (
                <FaCheckSquare color='#20A2DA' />
              ) : (
                <FaCommentAlt color='#8BC34A' />
              )}
              <PriorityComponent color={priorityColors[priority]} />
            </p>
            <div className='task-card-user'>
              <p></p>
              <h6>MC-{id}</h6>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default memo(TaskCard);
