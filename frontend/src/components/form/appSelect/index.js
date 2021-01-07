import React, { memo } from 'react';
import { useFormikContext } from 'formik';

import './style.scss';
import ErrorMessage from '../errorMessage';

const AppSelect = ({ name, options = [], property }) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  return (
    <div className='form-group'>
      <label>{name}</label>
      <select name={name} value={values[name]} onChange={handleChange}>
        <option value=''></option>
        {options.map(o => (
          <option key={o.id} value={+o.id}>
            {o[property]}
          </option>
        ))}
      </select>
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default memo(AppSelect);
