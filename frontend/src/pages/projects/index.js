import React, { memo, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import Table from '../../components/table';
import NewProject from '../../components/newProject';
import Spinner from '../../components/spinner';
import useProjects from '../../store/projects/actions';

const columns = [
  { name: 'name', link: true },
  { name: 'key' },
  { name: 'company', key: 'name' },
  { name: 'lead', key: 'email', link: true },
];

const Projects = () => {
  const {
    getData,
    setQuery,
    state,
    onSelectProject,
    sortProjects,
    onOpenModal,
  } = useProjects();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NewProject
        open={state.openModal}
        closeModal={() => onSelectProject(null)}
        initialState={state.project}
        companies={state.companies}
      />
      <div className='projects-page monkeys-p-5'>
        <div className='page-title-button-header'>
          <h3>Projects</h3>
          <button onClick={onOpenModal}>Create Project</button>
        </div>
        <div className='main-search-box'>
          <input type='text' onChange={e => setQuery(e.target.value)} />
          <BiSearchAlt className='pointer' />
        </div>
        <div className='projects-page__content'>
          {state.loading ? (
            <Spinner height={500} />
          ) : (
            <Table
              title='projects'
              columns={columns}
              sortColumn={state.sortColumn}
              data={state.sortedProjects}
              onSort={sortProjects}
              onSelect={onSelectProject}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Projects);
