import axios from '../../api/axios';
import { AuthStore } from './store';
import { deleteItem, getItem, setItem } from '../../utils/localstorage';
import types from './constants';

export default function useActions() {
  const [state, dispatch] = AuthStore.useAuthStore();
  const baseUrl = 'user';
  const tokenName = 'jwtToken';

  const login = async user => {
    try {
      const { data } = await axios.post(baseUrl + '/login', user);
      appLogin(data.user, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async tokenId => {
    try {
      const { data } = await axios.post(baseUrl + '/googleLogin', { tokenId });
      appLogin(data.user, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const appLogin = (user, token) => {
    dispatch({
      type: types.SET_USER,
      payload: user,
    });
    axios.setJwt(token);
    setItem(token, tokenName);
  };

  const logOut = () => {
    dispatch({ type: types.SET_USER, payload: null });
    axios.setJwt(null);
    deleteItem(tokenName);
  };

  const autoLogin = async () => {
    try {
      const token = getItem(tokenName);
      if (!token) throw Error();
      axios.setJwt(token);
      const { data } = await axios.get(baseUrl + '/me');
      dispatch({
        type: types.SET_USER,
        payload: data.user,
      });
    } catch (error) {
      logOut();
    }
  };

  const createdProjects = async (id) =>{
    try{
      const { allProjects } = await axios.get(baseUrl + '/CreatedProjects/' + {id} );
      return allProjects.data.createdProject;
    }catch(error){
      console.log(error);
    }
  };

  return {
    autoLogin,
    googleLogin,
    logOut,
    login,
    state,
    createdProjects,
  };
}
