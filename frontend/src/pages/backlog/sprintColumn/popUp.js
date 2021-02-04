import { Popover } from '@material-ui/core';
import React, { memo } from 'react';

const PopUp = ({ open, handleClose, popOver, id }) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={popOver}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div id='pop' style={style}>
        <h4 className='pointer' style={styleH4}>
          Edit sprint
        </h4>
        <h4 className='pointer'>Delete sprint</h4>
      </div>
    </Popover>
  );
};

const style = {
  borderRadius: 5,
  padding: 10,
  width: 150,
};

const styleH4 = {
  fontSize: 50,
};

export default memo(PopUp);
