import { 
    REQUEST_INBOX, 
    INBOX_HAS_ERROR, 
    INBOX 
} from '../actions/inboxActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingInbox: false,
        inboxHasError: false,
        inbox: []
    }, action) {
    switch (action.type) {
      case REQUEST_INBOX:
        return Object.assign({}, state, {
            isFetchingInbox: true
        })
      case INBOX:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetchingInbox: false,
            inboxHasError: false,
            inbox: action.payload
        })
      case INBOX_HAS_ERROR:
        return Object.assign({}, state, {
            isFetchingInbox: false,
            inboxHasError: true
        })
      default:
        return state;
    }
}