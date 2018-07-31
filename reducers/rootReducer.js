import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notasReducer from './notasReducer';
import calendarReducer from './calendarReducer';
import calendarDetailReducer from './calendarDetailReducer';
import inboxReducer from './inboxReducer';
import sentBoxReducer from './sentBoxReducer';
import deletedBoxReducer from './deletedBoxReducer';
import messagesReducer from './messagesReducer';
import documentsReducer from './documentsReducer';

const rootReducer = combineReducers({
  loginReducer,
  notasReducer,
  calendarReducer,
  calendarDetailReducer,
  inboxReducer,
  sentBoxReducer,
  deletedBoxReducer,
  messagesReducer,
  documentsReducer
});

export default rootReducer;