import axios from './axios';
import getParams from '../utils/getParams';

const baseUrl = url => `task/${url}`;

const getTasks = params => axios.get(baseUrl(`read?${getParams(params)}`));

const updateTask = (id, data) => axios.patch(baseUrl(`update/${id}`), data);

export { getTasks, updateTask };
