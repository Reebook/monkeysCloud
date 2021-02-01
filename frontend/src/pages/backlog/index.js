import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import './style.scss';
import Breadcrumb from '../../components/breadcrumb';
import MainFilter from './mainFilter';
import useBacklog from '../../store/backlog/actions';
import NewSprint from '../../components/newSprint';
import { useParams } from 'react-router-dom';

const Backlog = () => {
  const { id } = useParams();
  const {
    onOpenModal,
    state: { openModal },
  } = useBacklog();

  return (
    <>
      <NewSprint openModal={openModal} closeModal={onOpenModal} project={id} />
      <div className='planning-page'>
        <div className='project-header'>
          <Breadcrumb />
        </div>
        <div className='planning-page__header'>
          <h3>Planning</h3>
          <div className='options-container'>
            <button onClick={onOpenModal}>Create Sprint</button>
            <button>
              <FaShareAlt className='icon icon-share' /> Share
            </button>
            <button>
              <BsThreeDots className='icon' />
            </button>
          </div>
        </div>
        <MainFilter />
        <div className='planning-container'></div>
      </div>
    </>
  );
};

export default Backlog;
