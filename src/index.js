import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';

const alumPresentListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_ALUM_PRESENT_LIST`:
      return [...state, action.payload];
    case `CLEAR_ALUM_PRESENT_LIST`:
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

const cohortPresentListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_COHORT_PRESENT_LIST`:
      return [...state, action.payload];
    case `CLEAR_COHORT_PRESENT_LIST`:
      return [];
    default:
      return state;
  }
}

const monthListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_MONTH_LIST`:
      return [...state, action.payload];
    case `CLEAR_MONTH_LIST`:
      return [];
    default:
      return state;
  }
}

const weekListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_WEEK_LIST`:
      return [...state, action.payload];
    case `CLEAR_WEEK_LIST`:
      return [];
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    alumPresentListReducer,
    cohortListReducer,
    cohortPresentListReducer,
    monthListReducer,
    weekListReducer,
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);