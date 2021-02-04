import React, { memo } from 'react';

const Button = ({ title, disabled, ...rest }) => (
  <button className='btn-submit' disabled={disabled} type='submit' {...rest}>
    {title}
  </button>
);

export default memo(Button);
