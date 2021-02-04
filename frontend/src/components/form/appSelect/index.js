import React, { memo } from 'react';
import { useFormikContext } from 'formik';
import { Select, MenuItem } from '@material-ui/core';

import './style.scss';
import ErrorMessage from '../errorMessage';

const AppSelect = ({ defaultValue, name, label, options = [], property, width = 300, ...rest }) => {
  const { values, handleChange, errors, touched } = useFormikContext();
  return (
    <div className='form-group'>
      <label>{label || name}</label>
      <Select
        {...rest}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        name={name}
        value={values[name]}
        onChange={handleChange}
        variant='outlined'
        style={{ width }}
      >
        {defaultValue && <MenuItem value=''>{defaultValue}</MenuItem>}
        {options.map((o, i) => (
          <MenuItem key={i} value={+o[property] || +o.id} style={{ textTransform: 'capitalize' }}>
            {o.icon && o.icon()} {o.name}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && touched[name] && <ErrorMessage message={errors[name]} />}
    </div>
  );
};

export default memo(AppSelect);
