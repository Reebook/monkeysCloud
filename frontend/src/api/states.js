import axios from './axios';

const baseUrl = url => `state/${url}`;

const getStates = id => axios.get(baseUrl(`project/${id}`));

const updateState = (id, data) => axios.patch(`state/update/${id}`, data);

export { getStates, updateState };
