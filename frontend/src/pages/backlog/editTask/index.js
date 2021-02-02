import React from 'react';
import { GrAttachment } from 'react-icons/gr';

import './style.scss';
import AppForm from '../../../components/form/appForm';
import EditableInput from '../../../components/form/editableInput';

const EditTask = ({ name }) => {
  return (
    <div className='edit-task'>
      <div className='edit-task-header'>
        <h3>name</h3>
        <div className='options'>
          <GrAttachment />
        </div>
      </div>
    </div>
  );
};

export default EditTask;
