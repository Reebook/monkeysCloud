import React, { createContext, useContext, useReducer } from 'react';

import actions from './constants';

const defaultState = {
  company: null,
  loading: true,
  openModal: false,
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
      };

    case actions.SET_MODAL:
      return {
        ...state,
        openModal: !state.openModal,
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

export const CompanyDetailsStore = {
  State,
  Dispatch,
  Provider,
  useCompanyDetails: () => [useContext(State), useContext(Dispatch)],
};
