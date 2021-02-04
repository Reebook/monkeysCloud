import React, { memo } from 'react';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../form/appForm';
import AppInput from '../form/appInput';
import AppButton from '../form/button';
import axios from '../../api/axios';
import modalStyles from '../../utils/modalStyles';

const NewState = ({ closeModal, openModal, project }) => {
  const onSubmit = async values => {
    try {
      await axios.post('state/create', { ...values, project });
      NotificationManager.success('State updated successfully!');
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal onRequestClose={closeModal} isOpen={openModal} style={modalStyles} ariaHideApp={false}>
      <div className='new-state modal'>
        <h2>Create New State</h2>
        <AppForm initialValues={defaultState} onSubmit={onSubmit} validationSchema={validationSchema}>
          <AppInput name='name' placeholder='State Name' label='State Name' />
          <div className='d-flex justify-content-end'>
            <AppButton title='Create' />
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const defaultState = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
});

export default memo(NewState);
