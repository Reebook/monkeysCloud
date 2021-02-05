import React, { memo, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import { getCompanies } from '../../api/company';
import Table from '../../components/table';
import NewCompany from '../../components/newCompany';
import Spinner from '../../components/spinner';
import useApi from '../../hooks/useApi';
import useQuery from '../../hooks/useQuery';

const Companies = props => {
  const params = useQuery();
  const [state, setState] = useState({
    query: '',
    loading: true,
    company: null,
    companies: [],
    sortColumn: { path: '', order: 'asc' },
    sortedCompanies: [],
    openModal: false,
  });

  const [modal, setModal] = useState(false);
  const { loading, request, data } = useApi(getCompanies);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*   useEffect(() => {
    if (query) onOpenModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); */
  const onOpenModal = () => setModal(false);
  const onSelectCompany = company => {
    setState({ ...state, company });
    setModal(!modal);
  };
  const onSortCompanies = () => {};

  const { company, sortColumn, sortedCompanies } = state;
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
