export default (data, path, order) => {
  return data.sort((a, b) => (path(a).toLowerCase() < path(b).toLowerCase() ? -1 : 1) * (order === 'asc' ? 1 : -1));
};
