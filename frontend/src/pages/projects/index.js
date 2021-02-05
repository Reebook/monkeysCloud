import React, { memo, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import { getCompanies } from '../../api/company';
import { getProjects } from '../../api/projects';
import Table from '../../components/table';
import NewProject from '../../components/newProject';
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
  const { loading, request } = useApi(() => Promise.all([getProjects(), getCompanies()]));

  const initialData = async () => {
    const [projects, companies] = await request();
    setState({
      ...state,
      projects: projects.data.projects,
      companies: companies.data.companies,
      sortedProjects: projects.data.projects,
    });
  };

  useEffect(() => {
    initialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenModal = () => setModal(!modal);

  const onSelectProject = project => {
    const data = project ? Object.assign(project, { company: project.company.id }) : project;
    setState({ ...state, project: data });
    setModal(!modal);
  };

  const { sortColumn, project, companies, sortedProjects } = state;

  const onSortProjects = path => {
    const newSort = { path };
    if (sortColumn.path === path) {
      newSort.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else newSort.order = 'asc';
    const property = item => {
      if (path === 'lead') return item[path]['email'];
      if (path === 'company') return item[path]['name'];
      return item[path];
    };
    const newArray = [...state.sortedProjects];
    newArray.sort((a, b) => (property(a).toLowerCase() < property(b).toLowerCase() ? -1 : 1) * (newSort.order === 'asc' ? 1 : -1));
    setState({ ...state, sortColumn: newSort, sortedProjects: newArray });
  };

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
