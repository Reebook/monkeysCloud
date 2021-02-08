import axios from './axios';

const baseUrl = url => `sprint/${url}`;

const getSprints = id => axios.get(baseUrl(`read?project=${id}&finish=false`));

export { getSprints };
