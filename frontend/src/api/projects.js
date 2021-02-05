import axios from './axios';

const baseUrl = url => `project/${url}`;

const getProjects = () => axios.get(baseUrl(`read?lead=1`));

export { getProjects };
