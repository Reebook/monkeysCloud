import React, { memo } from 'react';
import { NotificationManager } from 'react-notifications';
import Modal from 'react-modal';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../form/appForm';
import AppInput from '../form/appInput';
import AppButton from '../form/button';
import axios from '../../api/axios';
import modalStyles from '../../utils/modalStyles';

const NewCompany = ({ initialState, open, closeModal }) => {
  const mode = initialState ? 'Update' : 'Create';

  const createCompany = async data => {
    try {
      await axios.post('company/create', data);
      NotificationManager.success('Company created successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const updateCompany = async ({ id, name, website, email, phone }) => {
    try {
      await axios.patch(`company/update/${id}`, {
        name,
        website,
        email,
        phone,
      });
      NotificationManager.success('Company updated successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const action = mode === 'Create' ? createCompany : updateCompany;

  const onSubmit = async values => {
    await action(values);
  };
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={open}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className='create-company modal'>
        <h2>{mode} Company</h2>
        <AppForm
          initialValues={initialState || defaultState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {options.map((o, i) => (
            <AppInput key={i} {...o} />
          ))}
          <div className='modal__button-container'>
            <AppButton title={mode} disabled={false} />
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  website: Yup.string().required().url().label('Website'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const defaultState = {
  name: '',
  website: '',
  phone: '',
  email: '',
};
const options = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Company Name',
  },
  {
    name: 'website',
    label: 'Website',
    placeholder: 'Company Website',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Company Phone',
    type: 'number',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Company Email',
  },
];

export default memo(NewCompany);
