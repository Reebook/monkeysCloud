import React, { memo } from 'react';
import { NotificationManager } from 'react-notifications';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../../components/form/appForm';
import AppInput from '../../components/form/appInput';
import AppButton from '../../components/form/button';
import axios from '../../api/axios';
import modalStyles from '../../utils/modalStyles';

const CreateCompany = () => {
  const history = useHistory();
  const onSubmit = async values => {
    try {
      await axios.post('company/create', values);
      NotificationManager.success('Company created successfully!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      onRequestClose={() => history.push('/projects')}
      isOpen={true}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className='create-company modal'>
        <h2>Create Company</h2>
        <AppForm
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {options.map((o, i) => (
            <AppInput key={i} {...o} />
          ))}
          <div className='modal__button-container'>
            <AppButton title='Create' />
          </div>
        </AppForm>
      </div>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
});

const initialState = {
  name: '',
};
const options = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Company Name',
  },
];

export default memo(CreateCompany);
