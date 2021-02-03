import React, { memo } from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from '../errorMessage';
import './style.scss';

const AppTextArea = ({ label, type = 'text', name, ...rest }) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  return (
    <div className='form-group'>
      <label>{label}</label>
      <textarea
        value={values[name]}
        name={name}
        type={type}
        onChange={handleChange}
        className={errors[name] && touched[name] && 'danger'}
        {...rest}
        rows={5}
      />
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default memo(AppTextArea);
