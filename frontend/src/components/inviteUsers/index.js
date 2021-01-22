import React, { memo } from 'react';
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../form/appForm';
import AppButton from '../form/button';
import AppInputArray from '../form/appInputArray';
import axios from '../../api/axios';
import modalStyles from '../../utils/modalStyles';

const initialState = {
  email: '',
  emails: [],
};

const InviteUsers = ({ openModal = true, closeModal }) => {
  const onSubmit = async ({ emails }) => {
    const promises = [];
    try {
      for (var email in emails) {
        promises.push(axios.post('company/invite', email));
      }
      await Promise.all(promises);
      NotificationManager.success(
        `${emails.lenght} people were invited successfully`
      );
    } catch {}
    closeModal();
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className='modal invite-users-modal'>
        <AppForm
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <h5>Invite users</h5>
          <AppInputArray
            label='Email Addresses *'
            name='email'
            arrayName='emails'
          />
          <p>
            Enter the necessary email addresses, press enter after adding a
            valid email.
          </p>
          <div className='buttons-container'>
            <AppButton title='Invite users' />
            <button onClick={closeModal}>Cancel</button>
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  emails: Yup.array().min(1),
  email: Yup.string().email().label('Email'),
});

export default memo(InviteUsers);
