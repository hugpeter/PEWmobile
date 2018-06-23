import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notasReducer from './notasReducer';
import calendarReducer from './calendarReducer';
import calendarDetailReducer from './calendarDetailReducer';
import inboxReducer from './inboxReducer';

const rootReducer = combineReducers({
  loginReducer,
  notasReducer,
  calendarReducer,
  calendarDetailReducer,
  inboxReducer
});

export default rootReducer;