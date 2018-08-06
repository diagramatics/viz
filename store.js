import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Create store with reducers and initial state
const initialState = {
  background: '#82c91e',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BACKGROUND':
      return {
        ...state,
        background: action.value,
      };

    default:
      return state;
  }
};

export const initStore = (state = initialState) =>
  createStore(reducer, state, devToolsEnhancer());

export default initStore;
