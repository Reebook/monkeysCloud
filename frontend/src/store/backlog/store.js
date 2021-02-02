import React, { createContext, useContext, useReducer } from 'react';

import actions from './constants';
import sprints from './sprints';

const defaultState = {
  project: {},
  sprints: sprints,
  loading: true,
  openModal: false,
  selectedTask: true,
};

const reducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_INITIAL_DATA:
      return {
        ...state,
      };

    case actions.OPEN_MODAL:
      return {
        ...state,
        openModal: !state.openModal,
      };

    case actions.UPDATE_COLUMNS:
      return {
        ...state,
        sprints: payload,
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

export const BacklogStore = {
  State,
  Dispatch,
  Provider,
  useBacklog: () => [useContext(State), useContext(Dispatch)],
};