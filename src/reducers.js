import { combineReducers } from 'redux';

const page = (state = '', action) => {
  switch(action.type) {
  case 'CHANGE_PAGE':
    return action.payload;
  default:
    return state;
  }
};

export default combineReducers({
  page
});
