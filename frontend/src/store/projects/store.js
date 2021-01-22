import React, { createContext, useContext, useReducer } from 'react';
import actions from './constants';

const defaultState = {
  companies: [],
  query: '',
  loading: true,
  project: null,
  projects: [],
  sortColumn: { path: '', order: 'asc' },
  sortedProjects: [],
  openModal: false,
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA:
      return {
        ...state,
        companies: payload.companies,
        projects: payload.projects,
        sortedProjects: payload.projects,
        loading: false,
      };

    case actions.SET_QUERY:
      return {
        ...state,
        query: payload.value,
        sortColumn: { path: '', order: 'asc' },
        sortedProjects: payload.sortedProjects,
      };

    case actions.SET_MODAL:
      return {
        ...state,
        openModal: !state.openModal,
      };

    case actions.SELECT_PROJECT:
      return {
        ...state,
        project: payload,
      };

    case actions.SORT_PROJECTS:
      return {
        ...state,
        sortColumn: payload.sortColumn,
        sortedProjects: payload.sortedProjects,
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

export const ProjectStore = {
  State,
  Dispatch,
  Provider,
  useProjects: () => [useContext(State), useContext(Dispatch)],
};
