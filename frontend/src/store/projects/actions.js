import actions from './constants';
import axios from '../../api/axios';
import { ProjectStore } from './store';

export default function useActions() {
  const [state, dispatch] = ProjectStore.useProjects();
  const baseUrl = action => `project/${action}`;

  const getProjects = async () => {
    try {
      const { data } = await axios.get(baseUrl('read'));
      dispatch({
        type: actions.GET_PROJECTS,
        payload: data.projects,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sortProjects = path => {
    const sortColumn = { path };
    if (state.sortColumn.path === path) {
      sortColumn.order = state.sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else sortColumn.order = 'asc';
    const property = sortColumn.path;
    const sortedProjects = [...state.sortedProjects];
    dispatch({
      type: actions.SORT_PROJECTS,
      payload: {
        sortColumn,
        sortedProjects: sortedProjects.sort(
          (a, b) =>
            (a[property].toLowerCase() < b[property].toLowerCase() ? -1 : 1) *
            (sortColumn.order === 'asc' ? 1 : -1)
        ),
      },
    });
  };

  const setQuery = value => {
    dispatch({
      type: actions.SET_QUERY,
      payload: {
        value,
        sortedProjects: value
          ? state.projects.filter(p =>
              p.name.toLowerCase().startsWith(value.toLowerCase())
            )
          : state.projects,
      },
    });
  };

  return {
    getProjects,
    setQuery,
    sortProjects,
    state,
  };
}
