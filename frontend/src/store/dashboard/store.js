import React, { createContext, useContext, useReducer } from 'react';
import actions from './constants';

const defaultState = {
  columns: {},
  columnOrder: [],
  loading: true,
  springModal: false,
  newStateModal: false,
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA:
      return {
        ...state,
        columns: payload.columns,
        columnOrder: payload.columnOrder,
        loading: false,
      };

    case actions.UPDATE_TASKS:
      return { ...state, columns: payload };

    case actions.UPDATE_COLUMNS:
      return { ...state, columnOrder: payload };

    case actions.SET_SPRINT_MODAL:
      return { ...state, springModal: !state.springModal };

    case actions.SET_NEWSTATE_MODAL:
      return { ...state, newStateModal: !state.newStateModal };

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

export const DashboardStore = {
  State,
  Dispatch,
  Provider,
  useDashboard: () => [useContext(State), useContext(Dispatch)],
};
