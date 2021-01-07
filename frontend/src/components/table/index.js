import React, { memo } from 'react';

import './style.scss';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ columns, sortColumn, data, onSort, title, onSelect }) => (
  <div className='sortable-table'>
    {!data.length ? (
      <h3>No {title}</h3>
    ) : (
      <table className='sortable-table'>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} onSelect={onSelect} />
      </table>
    )}
  </div>
);

export default memo(Table);
