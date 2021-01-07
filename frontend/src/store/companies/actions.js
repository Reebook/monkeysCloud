import actions from './constants';
import axios from '../../api/axios';
import { CompanyStore } from './store';

export default function useActions() {
  const [state, dispatch] = CompanyStore.useCompanies();
  const baseUrl = action => `company/${action}`;

  const getCompanies = async () => {
    try {
      const { data } = await axios.get(baseUrl('admin'));
      dispatch({
        type: actions.GET_COMPANIES,
        payload: data.companies,
      });
    } catch (error) {
      dispatch({ type: actions.ERROR });
    }
  };

  const sortCompanies = path => {
    const sortColumn = { path };
    if (state.sortColumn.path === path) {
      sortColumn.order = state.sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else sortColumn.order = 'asc';
    const property = item =>
      path === 'owner' ? item[path]['email'] : item[path];
    const sortedCompanies = [...state.sortedCompanies];
    sortedCompanies.sort(
      (a, b) =>
        (property(a).toLowerCase() < property(b).toLowerCase() ? -1 : 1) *
        (sortColumn.order === 'asc' ? 1 : -1)
    );
    dispatch({
      type: actions.SORT_COMPANIES,
      payload: {
        sortColumn,
        sortedCompanies,
      },
    });
  };

  const setQuery = value => {
    dispatch({
      type: actions.SET_QUERY,
      payload: {
        value,
        sortedCompanies: value
          ? state.companies.filter(c =>
              c.name.toLowerCase().startsWith(value.toLowerCase())
            )
          : state.companies,
      },
    });
  };

  const onSelectCompany = company => {
    dispatch({ type: actions.SELECT_COMPANY, payload: company });
    dispatch({ type: actions.SET_MODAL });
  };

  const onOpenModal = () => dispatch({ type: actions.SET_MODAL });

  return {
    getCompanies,
    onOpenModal,
    onSelectCompany,
    setQuery,
    sortCompanies,
    state,
  };
}
