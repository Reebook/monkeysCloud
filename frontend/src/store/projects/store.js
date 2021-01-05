import React, { createContext, useContext, useReducer } from 'react';
import actions from './constants';

const defaultState = {
  query: '',
  loading: true,
  projects: [],
  sortColumn: { path: '', order: 'asc' },
  sortedProjects: [],
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        sortedProjects: payload,
        loading: false,
      };

    case actions.SET_QUERY:
      return {
        ...state,
        query: payload.value,
        sortColumn: { path: '', order: 'asc' },
        sortedProjects: payload.sortedProjects,
      };

    case actions.SORT_PROJECTS:
      return {
        ...state,
        sortColumn: payload.sortColumn,
        sortedProjects: payload.sortedProjects,
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
