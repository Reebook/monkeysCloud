import React, { memo } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const TableHeader = ({ columns, onSort, sortColumn }) => {
  const icon = path => {
    if (sortColumn.path !== path) return null;
    if (sortColumn.order === 'asc') return <FaAngleUp />;
    return <FaAngleDown />;
  };
  return (
    <thead>
      <tr>
        {columns.map(({ name }) => (
          <th onClick={() => onSort(name)} key={name}>
            <p className='pointer'>
              {name} {icon(name)}
            </p>
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
