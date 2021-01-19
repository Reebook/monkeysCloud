import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import Card from './card';
import InviteUsers from '../../components/inviteUsers';
import Spinner from '../../components/spinner';
import useCompanyDetails from '../../store/companyDetails/actions';

const Company = () => {
  const {
    getCompany,
    setModal,
    state: { company, loading, openModal },
  } = useCompanyDetails();
  const id = useParams().id;

  useEffect(() => {
    getCompany(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <>
      <InviteUsers openModal={openModal} closeModal={setModal} />
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
