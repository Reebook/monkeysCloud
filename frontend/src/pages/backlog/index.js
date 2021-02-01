import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import './style.scss';
import Breadcrumb from '../../components/breadcrumb';
import MainFilter from './mainFilter';
import NewSprint from '../../components/newSprint';
import SprintColumn from './sprintColumn';
import useBacklog from '../../store/backlog/actions';

const Backlog = () => {
  const { id } = useParams();
  const {
    onOpenModal,
    state: { openModal },
  } = useBacklog();

  const onDragEnd = () => {};

  return (
    <>
      <NewSprint openModal={openModal} closeModal={onOpenModal} project={id} />
      <div className='planning'>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <SprintColumn {...sprint} />
          <SprintColumn {...sprint} />
        </DragDropContext>
      </div>
    </>
  );
};

const sprint = {
  createdAt: 1612205868818,
  updatedAt: 1612205868818,
  id: 1,
  name: 'joshua1',
  duration: 0,
  startDate: 1612204069181,
  endDate: 1612204069181,
  sprintGoal: '55',
  isActive: true,
  project: 1,
  tasks: [
    {
      name: 'Logic Sprints',
      priority: 4,
    },
    {
      name: 'Logic Sprints',
      priority: 2,
    },
  ],
};

export default Backlog;
