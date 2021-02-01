import React, { memo, useRef } from 'react';

import { useIsOut } from '../../../utils/customHooks/useIsOut';

const PopUp = ({ open, close }) => {
  const popUpRef = useRef(null);
  useIsOut({ ref: popUpRef, callback: close });
  if (!open) return null;
  return (
    <div className='popup-over-options' ref={popUpRef}>
      <h4 className='pointer'>Edit sprint</h4>
      <h4 className='pointer'>Delete sprint</h4>
    </div>
  );
};

export default memo(PopUp);
