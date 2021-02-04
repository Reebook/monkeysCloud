import React, { memo } from 'react';
import { useFormikContext } from 'formik';
import Select from '@material-ui/core/Select';
import { Fa500Px } from 'react-icons/fa';

import './style.scss';
import ErrorMessage from '../errorMessage';
import MenuItem from '@material-ui/core/MenuItem';

const mt = 5;

const AppSelect = ({ empty = true, name, label, options = [], property, width = '50%', ...rest }) => {
  const { values, handleChange, errors, touched } = useFormikContext();

  return (
    <div className='form-group'>
      <label>{label || name}</label>
      <Select
        {...rest}
        name={name}
        value={values[name]}
        onChange={handleChange}
        variant='outlined'
        style={{ width, marginTop: mt }}
      >
        {empty && <option value=''></option>}
        {options.map((o, i) => (
          <MenuItem key={i} value={o[property || 'id']} style={{ textTransform: 'capitalize' }}>
            {o.icon && o.icon()} {o.name}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default memo(AppSelect);
