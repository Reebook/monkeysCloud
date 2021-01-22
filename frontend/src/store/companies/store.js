import React, { createContext, useContext, useReducer } from 'react';
import actions from './constants';

const defaultState = {
  query: '',
  loading: true,
  company: null,
  companies: [],
  sortColumn: { path: '', order: 'asc' },
  sortedCompanies: [],
  openModal: false,
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_COMPANIES:
      return {
        ...state,
        companies: payload,
        sortedCompanies: payload,
        loading: false,
      };

    case actions.SELECT_COMPANY:
      return {
        ...state,
        company: payload,
      };

    case actions.SET_QUERY:
      return {
        ...state,
        query: payload.value,
        sortColumn: { path: '', order: 'asc' },
        sortedCompanies: payload.sortedCompanies,
      };

    case actions.SET_MODAL:
      return {
        ...state,
        openModal: !state.openModal,
      };

    case actions.SORT_COMPANIES:
      return {
        ...state,
        sortColumn: payload.sortColumn,
        sortedCompanies: payload.sortedCompanies,
      };

    case actions.ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

const State = createContext(null);
const Dispatch = createContext(null);

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
}

export const CompanyStore = {
  State,
  Dispatch,
  Provider,
  useCompanies: () => [useContext(State), useContext(Dispatch)],
};
