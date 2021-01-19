import React, { useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

import Table from '../../components/table';
import NewCompany from '../../components/newCompany';
import Spinner from '../../components/spinner';
import useCompanies from '../../store/companies/actions';

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Companies = () => {
  const query = useQuery().get('new') === 'true' ? true : false;
  const {
    getCompanies,
    onOpenModal,
    onSelectCompany,
    setQuery,
    state,
    sortCompanies,
  } = useCompanies();

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query) onOpenModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <NewCompany
        open={state.openModal}
        closeModal={() => onSelectCompany(null)}
        initialState={state.company}
      />
      <div className='companies-page monkeys-p-5'>
        <div className='page-title-button-header'>
          <h3>Companies</h3>
          <button onClick={onOpenModal}>Create Company</button>
        </div>
        <div className='main-search-box'>
          <input type='text' onChange={e => setQuery(e.target.value)} />
          <BiSearchAlt className='pointer' />
        </div>
        <div className='companies-page__content'>
          {state.loading ? (
            <Spinner height={500} />
          ) : (
            <Table
              title='companies'
              columns={columns}
              sortColumn={state.sortColumn}
              data={state.sortedCompanies}
              onSort={sortCompanies}
              onSelect={onSelectCompany}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Companies;
