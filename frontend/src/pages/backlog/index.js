import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import './style.scss';
import Breadcrumb from '../../components/breadcrumb';
import EditTask from './editTask';
import MainFilter from './mainFilter';
import NewSprint from '../../components/newSprint';
import SprintColumn from './sprintColumn';
import useBacklog from '../../store/backlog/actions';
import { DragDropContext } from 'react-beautiful-dnd';

const Backlog = () => {
  const { id } = useParams();
  const {
    onDragEnd,
    onOpenModal,
    state: { openModal, sprints },
  } = useBacklog();

  return (
    <>
      <NewSprint openModal={openModal} closeModal={onOpenModal} project={id} />
      <div className='planning'>
        <>
          <div className='project-header'>
            <Breadcrumb />
          </div>
          <div className='planning__header'>
            <h3>Planning</h3>
            <div className='options-container'>
              <button className='outline-button' onClick={onOpenModal}>
                Create Sprint
              </button>
              <button className='outline-button'>
                <FaShareAlt className='icon icon-share' /> Share
              </button>
              <button className='outline-button'>
                <BsThreeDots className='icon' />
              </button>
            </div>
          </div>
          <MainFilter />
        </>
        <div className='planning__content'>
          <div className='sprint-column-container'>
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.keys(sprints).map((i, index) => (
                <SprintColumn {...sprints[i]} key={index} />
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Backlog;
