import React, { memo } from 'react';
import { useFormikContext } from 'formik';

import './style.scss';

const Button = ({ title, disabled, ...rest }) => {
  const { isValid, dirty } = useFormikContext();
  return (
    <button
      className='form-button'
      disabled={disabled || !(isValid && dirty)}
      type='submit'
      {...rest}
    >
      {title}
    </button>
  );
};

export default memo(Button);
