import React, { memo } from 'react';
import Modal from 'react-modal';
import axios from '../../api/axios';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../../components/form/appForm';
import AppInput from '../../components/form/appInput';
import AppButton from '../../components/form/button';
import modalStyles from '../../utils/modalStyles';

const CreateProject = () => {
  const history = useHistory();
  const onSubmit = async values => {
    try {
      await axios.post('project/create', { ...values, company: 1 });
      NotificationManager.success('Project created successfully!');
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
      <div className='create-project modal'>
        <div className='create-project__main'>
          <h2>Create Project</h2>
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
      </div>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  key: Yup.string().required().max(3).label('Key'),
});

const initialState = {
  name: '',
  key: '',
};
const options = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'key',
    label: 'Key',
  },
];

export default memo(CreateProject);
