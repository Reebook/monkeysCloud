import React from 'react';
import { IoIosSearch } from 'react-icons/io';

import MonkeyInput from '../../components/monkeyInput';

const MainFilter = () => {
  return (
    <div className='row'>
      <div className='d-flex input-box'>
        <MonkeyInput placeholder='Search by name, user...' className='overriding-input' name='planningSearch' />
        <button className='icon-search-button' id='monkeys-search-planning'>
          <IoIosSearch className='icon-search-change' />
        </button>
      </div>
    </div>
  );
};

export default MainFilter;
