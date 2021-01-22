import React, { memo } from 'react';
import { useFormikContext } from 'formik';
import { Avatar, Chip } from '@material-ui/core';

import './style.scss';
import DefaultImg from '../../../assets/images/default-avatar.png';
import ErrorMessage from '../errorMessage';

const AppInputArray = ({ label, name, arrayName, ...rest }) => {
  const {
    values,
    handleChange,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormikContext();

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      if (errors[name] || !values[name]) return;
      e.preventDefault();
      setValues({
        [name]: '',
        [arrayName]: [...values[arrayName], values[name]],
      });
    }
  };

  const onDelete = i => {
    setFieldValue(
      arrayName,
      values[arrayName].filter((item, index) => index !== i)
    );
  };

  return (
    <>
      <div className='form-group'>
        <label>{label}</label>
        <input
          onKeyDown={onKeyDown}
          value={values[name]}
          name={name}
          onChange={handleChange}
          className={errors[name] && touched[name] && 'danger'}
          {...rest}
        />
        {errors[name] && <ErrorMessage message={errors[name]} />}
      </div>
      <div className='chip-items'>
        {values[arrayName].map((e, i) => (
          <Chip
            avatar={<Avatar alt='Natacha' src={DefaultImg} />}
            label={e}
            onDelete={() => onDelete(i)}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default memo(AppInputArray);
