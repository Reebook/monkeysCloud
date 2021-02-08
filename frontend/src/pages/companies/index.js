import React, { memo, useCallback, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import { getCompanies } from '../../api/companies';
import NewCompany from '../../components/newCompany';
import Table from '../../components/table';
import Spinner from '../../components/spinner';
import sortData from '../../utils/sortData';
import useApi from '../../hooks/useApi';
import useQuery from '../../hooks/useQuery';

const Companies = () => {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    query: '',
    loading: true,
    company: null,
    companies: [],
    sortColumn: { path: '', order: 'asc' },
    sortedCompanies: [],
    openModal: false,
  });
  const setInitialData = companies => setState({ ...state, companies, sortedCompanies: companies });

  const params = useQuery();
  const { loading, request } = useApi(getCompanies, setInitialData);

  useEffect(() => {
    if (params.new === 'true') onOpenModal();
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onOpenModal = useCallback(() => setModal(!modal), []);

  const onSelectCompany = useCallback(
    company => {
      setState({ ...state, company });
      setModal(!modal);
    },
    [state, modal]
  );

  const { company, sortColumn, sortedCompanies, companies } = state;

  const onSortCompanies = useCallback(
    path => {
      const newSort = { path };
      if (sortColumn.path === path) newSort.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
      else newSort.order = 'asc';
      const property = item => (path === 'owner' ? item[path]['email'] : item[path]);
      const data = sortData(companies, property, newSort.order);
      setState({
        ...state,
        sortColumn: newSort,
        sortedCompanies: data,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortColumn, sortedCompanies]
  );

  return (
    <>
      <NewCompany open={modal} closeModal={() => onSelectCompany(null)} initialState={company} />
      <div className='companies-page monkeys-p-5'>
        <div className='page-title-button-header'>
          <h3>Companies</h3>
          <button onClick={onOpenModal}>Create Company</button>
        </div>
        <div className='main-search-box'>
          <input type='text' onChange={() => {}} />
          <BiSearchAlt className='pointer' />
        </div>
        <div className='companies-page__content'>
          {loading ? (
            <Spinner height={500} />
          ) : (
            <Table title='companies' columns={columns} sortColumn={sortColumn} data={sortedCompanies} onSort={onSortCompanies} onSelect={onSelectCompany} />
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
    to: function (value) {
      return `companies/${value['id']}`;
    },
  },
  {
    name: 'owner',
    key: 'email',
    link: true,
    to: value => `companies/${value}`,
  },
];

export default memo(Companies);
