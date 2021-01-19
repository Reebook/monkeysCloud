import { NotificationManager } from 'react-notifications';

import actions from './constants';
import axios from '../../api/axios';
import { CompanyDetailsStore } from './store';

export default function useActions() {
  const [state, dispatch] = CompanyDetailsStore.useCompanyDetails();

  const getCompany = async id => {
    try {
      const { data } = await axios.get(`company/${id}`);
      dispatch({
        type: actions.SET_COMPANY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setModal = () => dispatch({ type: actions.SET_MODAL });

  return {
    getCompany,
    setModal,
    state,
  };
}
