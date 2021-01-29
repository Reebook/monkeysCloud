import React, { memo } from 'react';

import './style.scss';

const Button = ({ title, disabled, ...rest }) => (
  <button className='form-button' disabled={disabled} type='submit' {...rest}>
    {title}
  </button>
);

export default memo(Button);
