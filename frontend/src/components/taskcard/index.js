// Third libs
import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaCheckSquare, FaCommentAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
// Local
import './style.scss';
import Priorities from '../../utils/priorities';

const TaskCard = ({ id, name, priority, index, state, type }) => {
  const history = useHistory();
  const getStyle = dragStyle => ({
    borderLeftColor: Priorities[priority].color,
    ...dragStyle,
  });

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
              {type === 'task' ? <FaCheckSquare color='#20A2DA' /> : <FaCommentAlt color='#8BC34A' />}
              {/* {Priorities[priority].icon()} */}
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
