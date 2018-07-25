import { 
    REQUEST_MESSAGE,
    MESSAGE_HAS_ERROR,
    MESSAGE
} from '../actions/inboxActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingMessage: false,
        messageHasError: false,
        messages: [],
        newMessageCount: 0
    }, action) {
    switch (action.type) {
      case REQUEST_MESSAGE:
        return Object.assign({}, state, {
            isFetchingMessage: true
        })
      case MESSAGE:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetchingMessage: false,
            messageHasError: false,
            messages: [...state.messages, action.payload]
        })
      case MESSAGE_HAS_ERROR:
        return Object.assign({}, state, {
            isFetchingInbox: false,
            inboxHasError: true
        })
      default:
        return state;
    }
}