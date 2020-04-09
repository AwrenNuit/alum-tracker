import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';

const allDataReducer = (state=[], action) => {
  switch(action.type){
    case `SET_TALLY_LIST`:
      return [...state, action.payload];
    case `CLEAR_TALLY_LIST`:
      return [];
    default:
      return state;
  }
}

const cohortListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_COHORT_LIST`:
      return [...state, action.payload];
    case `CLEAR_COHORT_LIST`:
      return [];
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    allDataReducer,
    cohortListReducer,
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);