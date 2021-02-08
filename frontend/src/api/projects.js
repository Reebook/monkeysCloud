import axios from './axios';

const baseUrl = url => `project/${url}`;

const getProject = () => axios.get(baseUrl(`${1}/users`));

const getProjects = () => axios.get(baseUrl(`read?lead=1`));

export { getProject, getProjects };
