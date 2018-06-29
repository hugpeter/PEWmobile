import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notasReducer from './notasReducer';
import calendarReducer from './calendarReducer';
import calendarDetailReducer from './calendarDetailReducer';
import inboxReducer from './inboxReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  loginReducer,
  notasReducer,
  calendarReducer,
  calendarDetailReducer,
  inboxReducer,
  messagesReducer
});

export default rootReducer;