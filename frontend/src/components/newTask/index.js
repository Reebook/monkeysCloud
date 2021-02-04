import React, { useState, useEffect, memo } from 'react';
import Modal from 'react-modal';

import './style.scss';
import AppButton from '../form/button';
import AppForm from '../form/appForm';
import AppInput from '../form/appInput';
import AppTextArea from '../form/appTextArea';
import AppSelect from '../form/appSelect';
import axios from '../../api/axios';
import DropImage from '../form/dropImage';
import modalStyles from '../../utils/modalStyles';
import priorities from '../../utils/priorities';

const NewTask = ({ closeModal, openModal }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    getComponents();
  }, []);

  const getComponents = async () => {
    const components = await axios.get(`component/project/1`);
    setComponents(components);
  };

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Modal onRequestClose={closeModal} isOpen={openModal} style={modalStyles} ariaHideApp={false}>
      <div className='modal new-task'>
        <AppForm initialValues={defaultState} onSubmit={onSubmit}>
          <h3 className='create-issue'>Create Issue</h3>
          <AppSelect options={projects} name='project' />
          <AppSelect options={types} label='issue type' name='isEpic' property='value' />
          <p className='description'>
            Some issue types are unavailable due to incompatible field configuration and/or workflow associations.
          </p>
          <hr />
          <AppInput name='summary' label='Summary' />
          <AppSelect options={components1} name='component' />
          <AppSelect property='value' options={Object.keys(priorities).map(i => ({ ...priorities[i] }))} name='priority' />
          <DropImage />
          <AppTextArea label='Description' name='description' />
          <div className='d-flex align-items-center justify-content-end'>
            <span className='d-flex align-items-center monkeys-mr-2 '>
              <input className='monkeys-mr-1' type='checkbox' />
              Create another
            </span>
            <AppButton title='Create' />
            <button className='btn-cancel' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const defaultState = {
  project: '',
  isEpic: false,
  priority: 3,
  summary: '',
  component: '',
  attachment: '',
  description: '',
};

const types = [
  { name: 'Task', value: false },
  { name: 'Epic', value: true },
];

const components1 = [
  { name: 'Task', id: 1 },
  { name: 'Epic', id: 2 },
];

const projects = [{ id: 1, name: 'Monkey cloud' }];

export default memo(NewTask);
