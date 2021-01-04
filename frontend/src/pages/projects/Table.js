import React, { memo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo/monkey.png';
import useProjects from '../../store/projects/actions';

const ths = ['name', 'key', 'lead'];

const Table = () => {
  const { state, sortProjects } = useProjects();

  const sort = path => {
    if (state.sortColumn.path !== path) return null;
    if (state.sortColumn.order === 'asc') return <FaAngleUp />;
    return <FaAngleDown />;
  };

  if (!state.sortedProjects.length) return <h3>No Projects </h3>;

  return (
    <table>
      <thead>
        <tr>
          {ths.map(i => (
            <th onClick={() => sortProjects(i)} key={i}>
              <p className='pointer'>
                {i} {sort(i)}
              </p>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {state.sortedProjects.map(({ name, key, owner }, i) => (
          <tr key={i}>
            <td>
              <p>
                <img className='project-logo' src={logo} alt='monkey' />
                <Link to='/'>{name}</Link>
              </p>
            </td>
            <td>{key}</td>
            <td>
              <Link to='/'>{owner.email}</Link>
            </td>
            <td>
              <BsThreeDots className='pointer' />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(Table);
