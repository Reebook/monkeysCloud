import axios from './axios';

const baseUrl = url => `company/${url}`;

const getCompany = id => axios.get(baseUrl(`read/${id}`));

const getCompanies = () => axios.get(baseUrl(`read?owner=1`));

export { getCompanies, getCompany };
