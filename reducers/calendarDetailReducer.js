import { 
    REQUEST_CALENDAR_DETAIL,
    CALENDAR_DETAIL_HAS_ERROR,
    CALENDAR_DETAIL,
    UPDATE_CALENDAR_DETAIL_INFO 
} from '../actions/calendarActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function calendarReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetching: false,
        hasError: false,
        calendarDetails: [],
        anoPrev: '',
        idColegioPrev: '',
        currentDatePrev: '',
        cedulaPrev: ''
    }, action) {
    switch (action.type) {
      case REQUEST_CALENDAR_DETAIL:
        return Object.assign({}, state, {
            isFetching: true
        })
      case UPDATE_CALENDAR_DETAIL_INFO: {
        return Object.assign({}, state, {
            anoPrev: action.payload.anoPrev,
            idColegioPrev: action.payload.idColegioPrev,
            currentDatePrev: action.payload.currentDatePrev,
            cedulaPrev: action.payload.cedulaPrev
        })
      }
      case CALENDAR_DETAIL:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetching: false,
            hasError: false,
            calendarDetails: action.payload
        })
      case CALENDAR_DETAIL_HAS_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      default:
        return state;
    }
}