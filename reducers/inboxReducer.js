import { 
    REQUEST_INBOX, 
    INBOX_HAS_ERROR, 
    INBOX,
    MESSAGE_READ,
    REQUEST_NMC,
    NMC,
    NMC_HAS_ERROR 
} from '../actions/inboxActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingInbox: false,
        inboxHasError: false,
        inbox: [],
        newMessageCount: 0
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
        var numUnread = state.newMessageCount - 1;

        if(newReadMessage){
            return Object.assign({}, state, {
                inbox: inbox,
                newMessageCount: numUnread
            })
        } else {
            return state;
        }
      case REQUEST_NMC:
        return Object.assign({}, state, {
            isFetchingInbox: true
        })
      case NMC:
        return Object.assign({}, state, {
            isFetchingInbox: false,
            inboxHasError: false,
            newMessageCount: action.payload
        })
      case NMC_HAS_ERROR:
        return Object.assign({}, state, {
            isFetchingInbox: false,
            inboxHasError: true
        }) 
      default:
        return state;
    }
}