import React, { memo } from 'react';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../form/appForm';
import AppButton from '../form/button';
import AppDatePicker from '../form/appDatePicker';
import AppInput from '../form/appInput';
import axios from '../../api/axios';
import modalStyles from '../../utils/modalStyles';

const NewSprint = ({ closeModal, openModal, project }) => {
  const onSubmit = async values => {
    try {
      await axios.post('state/create', { ...values, project });
      NotificationManager.success('Sprint created successfully!');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onRequestClose={closeModal} isOpen={openModal} style={modalStyles} ariaHideApp={false}>
      <div className='new-sprint modal'>
        <h2> New Sprint</h2>
        <AppForm initialValues={defaultState} validationSchema={validationSchema} onSubmit={onSubmit}>
          <AppInput name='name' placeholder='Sprint Name' label='Sprint Name *' />
          <div className='dates-container'>
            <AppDatePicker label='Start Date *' name='startDate' />
            <AppDatePicker label='End Date *' name='endDate' />
          </div>
          <AppInput name='sprintGoal' placeholder='Sprint Goal' label='Sprint Goal *' />
          <div className='modal__button-container'>
            <AppButton title='Create' disabled={false} />
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  startDate: Yup.number().required(),
  endDate: Yup.number().required(),
  sprintGoal: Yup.string().required().label('Sprint goal'),
});

const defaultState = {
  name: '',
  startDate: Date.now(),
  endDate: Date.now() + 864e5 * 20,
  sprintGoal: '',
};

export default memo(NewSprint);
