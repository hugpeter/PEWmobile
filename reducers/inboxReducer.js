import { 
    REQUEST_INBOX, 
    INBOX_HAS_ERROR, 
    INBOX,
    MESSAGE_READ 
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
      case MESSAGE_READ:
        var inbox = state.inbox.map(x => ({...x}));
        var newReadMessage = inbox.filter(msg => msg.idmensaje == action.payload)[0];
        newReadMessage.estado = 'test';

        if(newReadMessage){
            return Object.assign({}, state, {
                inbox: inbox
            })
        } else {
            return state;
        }
      default:
        return state;
    }
}