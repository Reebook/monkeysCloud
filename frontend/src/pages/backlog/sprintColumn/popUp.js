import React, { memo, useRef } from 'react';
import { useIsOut } from '../../../utils/customHooks/useIsOut';

const PopUp = ({ open, close }) => {
  const ref = useRef(null);
  useIsOut({ ref, callback: close });
  if (!open) return null;
  return (
    <div className='popup-over-options' ref={ref}>
      <h4 className='pointer'>Edit sprint</h4>
      <h4 className='pointer'>Delete sprint</h4>
    </div>
  );
};

export default memo(PopUp);
