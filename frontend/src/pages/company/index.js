import React, { memo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './style.scss';
import Card from './card';
import { getCompany } from '../../api/companies';
import InviteUsers from '../../components/inviteUsers';
import Spinner from '../../components/spinner';
import useApi from '../../hooks/useApi';

const Company = () => {
  const [company, setCompany] = useState({});
  const [modal, setModal] = useState(false);

  const { id } = useParams();
  const history = useHistory();
  const { loading, request, error } = useApi(getCompany, setCompany);

  if (error?.status === 404) history.push('/companies');

  useEffect(() => {
    request(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <InviteUsers openModal={modal} closeModal={() => setModal(!modal)} />
      <div className='company-page'>
        <div className='company-page__header'></div>
        <div className='company-page__content'>
          <div className='company-page__left'>
            <Card name={company.name} size='big' />
            <div className='company-page__about'>
              <h5>About</h5>
              <p>Web Development</p>
            </div>
          </div>
          <div className='company-page__right'>
            {infoOptions.map(i => (
              <div className='company-page__detail' key={i}>
                <h6>{i}</h6>
                <p>{company[i]}</p>
              </div>
            ))}
            <div className='company-page__members'>
              <h6>Members</h6>
              <div className='company-page__card-container'>
                <Card name='josue' />
                <Card name='josue' />
                <Card name='josue' />
                <Card name='josue' />
                <Card name='josue' />
                <Card name='josue' />
                <div className='invite-members'>
                  <button onClick={setModal}>Add users</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const infoOptions = ['email', 'website', 'phone'];

export default memo(Company);
