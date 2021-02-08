import React, { memo, useCallback, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import { getCompanies } from '../../api/companies';
import { getProjects } from '../../api/projects';
import Table from '../../components/table';
import NewProject from '../../components/newProject';
import sortData from '../../utils/sortData';
import Spinner from '../../components/spinner';
import useApi from '../../hooks/useApi';

const Projects = () => {
  const [state, setState] = useState({
    companies: [],
    query: '',
    project: null,
    projects: [],
    sortColumn: { path: '', order: 'asc' },
    sortedProjects: [],
  });

  const [modal, setModal] = useState(false);
  const setInitialData = ([projects, companies]) => {
    setState({
      ...state,
      projects: projects.data,
      companies: companies.data,
      sortedProjects: projects.data,
    });
  };

  const { loading, request } = useApi(() => Promise.all([getProjects(), getCompanies()]), setInitialData);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onOpenModal = useCallback(() => setModal(!modal), []);

  const onSelectProject = useCallback(
    selected => {
      //check
      const project = selected ? { ...selected, company: selected.company.id } : selected;
      setState({ ...state, project });
      setModal(!modal);
    },
    [state, modal]
  );

  const onSortProjects = useCallback(
    path => {
      const newSort = { path };
      if (state.sortColumn.path === path) newSort.order = state.sortColumn.order === 'asc' ? 'desc' : 'asc';
      else newSort.order = 'asc';
      const property = item => {
        if (path === 'lead') return item[path]['email'];
        if (path === 'company') return item[path]['name'];
        return item[path];
      };
      const data = sortData(projects, property, { ...newSort.order });
      setState({ ...state, sortColumn: newSort, sortedProjects: data });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.sortedProjects, state.sortColumn]
  );

  const { sortColumn, projects, project, companies, sortedProjects } = state;

  return (
    <>
      <NewProject open={modal} closeModal={() => onSelectProject(null)} initialState={project} companies={companies} />
      <div className='projects-page monkeys-p-5'>
        <div className='page-title-button-header'>
          <h3>Projects</h3>
          <button onClick={onOpenModal}>Create Project</button>
        </div>
        <div className='main-search-box'>
          <input type='text' onChange={() => {}} />
          <BiSearchAlt className='pointer' />
        </div>
        <div className='projects-page__content'>
          {loading ? (
            <Spinner height={500} />
          ) : (
            <Table title='projects' columns={columns} sortColumn={sortColumn} data={sortedProjects} onSort={onSortProjects} onSelect={onSelectProject} />
          )}
        </div>
      </div>
    </>
  );
};

const columns = [
  {
    name: 'name',
    link: true,
    to: data => `projects/${data['id']}/dashboard`,
  },
  { name: 'key' },
  {
    name: 'company',
    key: 'name',
    link: true,
    to: function (value) {
      return `companies/${value.company.id}`;
    },
  },
  { name: 'lead', key: 'email', link: true, to: value => `projects/${value}` },
];

export default memo(Projects);
