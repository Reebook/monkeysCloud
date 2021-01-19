import React, { memo } from 'react';

import './style.scss';
import Avatar from '../../../assets/images/default-avatar.png';

const Card = ({ img, name, size = 'small' }) => {
  return (
    <div className={`card-info-details avatar-${size}`}>
      <div className='card-info-details__img-container '>
        <img src={img || Avatar} alt={name} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default memo(Card);
