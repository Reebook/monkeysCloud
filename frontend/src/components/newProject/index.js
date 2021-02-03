import React, { memo } from 'react';
import Modal from 'react-modal';
import axios from '../../api/axios';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import './style.scss';
import AppForm from '../form/appForm';
import AppInput from '../form/appInput';
import AppButton from '../form/button';
import AppSelect from '../form/appSelect';
import modalStyles from '../../utils/modalStyles';

const NewProject = ({ companies = [], closeModal, initialState, open }) => {
  const mode = initialState ? 'Update' : 'Create';

  const createProject = async data => {
    try {
      await axios.post('project/create', data);
      NotificationManager.success('Project created successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async ({ id, name, key, company }) => {
    try {
      await axios.patch(`project/update/${id}`, { name, key, company });
      NotificationManager.success('Project updated successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const action = mode === 'Create' ? createProject : updateProject;

  const onSubmit = async values => {
    await action(values);
  };

  return (
    <Modal onRequestClose={closeModal} isOpen={open} style={modalStyles} ariaHideApp={false}>
      <div className='create-project modal'>
        <div className='create-project__main'>
          <h2>{mode} Project</h2>
          <AppForm initialValues={initialState || defaultState} validationSchema={validationSchema} onSubmit={onSubmit}>
            {options.map((o, i) => (
              <AppInput key={i} {...o} />
            ))}

            {companies.length ? (
              <AppSelect options={companies} name='company' />
            ) : (
              <p>
                Do not have any associated company, before creating any project related, please{' '}
                <Link
                  to={{
                    pathname: `companies`,
                    search: 'new=true',
                  }}
                  onClick={closeModal}
                >
                  create a company
                </Link>
                .
              </p>
            )}

            <div className='modal__button-container'>
              <AppButton title={mode} disabled={companies.length ? false : true} />
            </div>
          </AppForm>
        </div>
      </div>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  company: Yup.string().required().label('Company'),
  name: Yup.string().required().label('Name'),
  key: Yup.string().required().max(3).label('Key'),
});

const defaultState = {
  company: '',
  name: '',
  key: '',
};
const options = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Project Name',
  },
  {
    name: 'key',
    label: 'Key',
    placeholder: 'Key',
  },
];

export default memo(NewProject);
