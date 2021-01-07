import React, { memo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo/monkey.png';

const renderCell = (column, item) => {
  if (column.key) return item[column.name][column.key];
  return item[column.name];
};

const TableBody = ({ data = [], columns = [], onSelect }) => (
  <tbody>
    {data.map(item => (
      <tr key={item.id}>
        {columns.map(column => (
          <td key={column.name}>
            <p>
              {column.name === 'name' && (
                <img className='project-logo' src={logo} alt='monkey' />
              )}
              {column.link ? (
                <Link to='/'>{renderCell(column, item)}</Link>
              ) : (
                renderCell(column, item)
              )}
            </p>
          </td>
        ))}
        <td>
          <BsThreeDots className='pointer' onClick={() => onSelect(item)} />
        </td>
      </tr>
    ))}
  </tbody>
);

export default memo(TableBody);
