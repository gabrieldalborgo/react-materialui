import { combineReducers } from 'redux';
import peopleReducer from './people';

const rootReducer = combineReducers({
  peopleState: peopleReducer,
});

export default rootReducer;