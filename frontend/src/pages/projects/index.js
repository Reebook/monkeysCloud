import React, { memo, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import './style.scss';
import Table from './Table';
import Spinner from '../../components/spinner';
import useProjects from '../../store/projects/actions';

const Projects = () => {
  const { getProjects, setQuery, state } = useProjects();
  const history = useHistory();
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='projects-page monkeys-p-5'>
      <div className='projects-page__header'>
        <div className='projects-page__header__title'>
          <h3>Projects</h3>
          <button onClick={() => history.push('/projects/new')}>
            Create Project
          </button>
        </div>
        <div className='search-box'>
          <input type='text' onChange={e => setQuery(e.target.value)} />
          <BiSearchAlt className='pointer' />
        </div>
      </div>
      <div className='projects-page__content'>
        {state.loading ? <Spinner height={500} /> : <Table />}
      </div>
    </div>
  );
};

export default memo(Projects);
