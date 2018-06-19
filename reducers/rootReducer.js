import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import notasReducer from './notasReducer';
import calendarReducer from './calendarReducer';
import calendarDetailReducer from './calendarDetailReducer';

const rootReducer = combineReducers({
  loginReducer,
  notasReducer,
  calendarReducer,
  calendarDetailReducer
});

export default rootReducer;