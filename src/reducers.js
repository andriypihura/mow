import { combineReducers } from 'redux';

const page = (state = 'home', action) => {
  switch(action.type) {
  case 'CHANGE_PAGE':
    console.log(action);
    return action.payload;
  default:
    return state;
  }
};

export default combineReducers({
  page
});
