import { combineReducers } from 'redux';
import gnomeReducer from './gnome';

const rootReducer = combineReducers({
  gnomeState: gnomeReducer,
});

export default rootReducer;