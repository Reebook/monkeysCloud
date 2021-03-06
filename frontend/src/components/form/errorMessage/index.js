import React, { memo } from 'react';

import './style.scss';

const ErrorMessage = ({ message }) => (
  <div className='error-message'>{message}</div>
);

export default memo(ErrorMessage);
