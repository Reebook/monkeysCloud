import actions from './constants';
import axios from '../../api/axios';
import { ProjectStore } from './store';

export default function useActions() {
  const [state, dispatch] = ProjectStore.useProjects();
  const baseUrl = (base, action) => `${base ? base : 'project'}/${action}`;

  const getData = async () => {
    try {
      const res = await Promise.all([
        axios.get(baseUrl(null, 'read')),
        axios.get(baseUrl('company', 'admin')),
      ]);
      dispatch({
        type: actions.GET_DATA,
        payload: {
          projects: res[0].data.projects,
          companies: res[1].data.companies,
        },
      });
    } catch (error) {
      dispatch({ type: actions.ERROR });
    }
  };

  const sortProjects = path => {
    const sortColumn = { path };
    if (state.sortColumn.path === path) {
      sortColumn.order = state.sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else sortColumn.order = 'asc';
    const property = item => {
      if (path === 'lead') return item[path]['email'];
      if (path === 'company') return item[path]['name'];
      return item[path];
    };

    const sortedProjects = [...state.sortedProjects];
    sortedProjects.sort(
      (a, b) =>
        (property(a).toLowerCase() < property(b).toLowerCase() ? -1 : 1) *
        (sortColumn.order === 'asc' ? 1 : -1)
    );
    dispatch({
      type: actions.SORT_PROJECTS,
      payload: {
        sortColumn,
        sortedProjects,
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

  const onSelectProject = project => {
    const data = project
      ? {
          id: project.id,
          name: project.name,
          key: project.key,
          company: project.company.id,
        }
      : project;
    dispatch({ type: actions.SELECT_PROJECT, payload: data });
    dispatch({ type: actions.SET_MODAL });
  };

  const onOpenModal = () => dispatch({ type: actions.SET_MODAL });

  return {
    getData,
    onOpenModal,
    setQuery,
    onSelectProject,
    sortProjects,
    state,
  };
}
