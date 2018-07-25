import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notasReducer from './notasReducer';
import calendarReducer from './calendarReducer';
import calendarDetailReducer from './calendarDetailReducer';
import inboxReducer from './inboxReducer';
import sentBoxReducer from './sentBoxReducer';
import messagesReducer from './messagesReducer';

const rootReducer = combineReducers({
  loginReducer,
  notasReducer,
  calendarReducer,
  calendarDetailReducer,
  inboxReducer,
  sentBoxReducer,
  messagesReducer
});

export default rootReducer;