import { 
    REQUEST_CALENDAR_DATA, 
    CALENDAR_HAS_ERROR, 
    CALENDAR
} from '../actions/calendarActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function calendarReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetching: false,
        hasError: false,
        calendarData: {}
    }, action) {
    switch (action.type) {
      case REQUEST_CALENDAR_DATA:
        return Object.assign({}, state, {
            isFetching: true
        })
      case CALENDAR:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetching: false,
            hasError: false,
            calendarData: action.payload
        })
      case CALENDAR_HAS_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      default:
        return state;
    }
}