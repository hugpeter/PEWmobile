import { 
    REQUEST_DELETEDBOX, 
    DELETEDBOX_HAS_ERROR, 
    DELETEDBOX
} from '../actions/deletedBoxActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingDeletedBox: false,
        deletedBoxHasError: false,
        deletedBox: []
    }, action) {
    switch (action.type) {
      case REQUEST_DELETEDBOX:
        return Object.assign({}, state, {
            isFetchingDeletedBox: true
        })
      case DELETEDBOX:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetchingDeletedBox: false,
            deletedBoxHasError: false,
            deletedBox: action.payload
        })
      case DELETEDBOX_HAS_ERROR:
        return Object.assign({}, state, {
            isFetchingDeletedBox: false,
            deletedBoxHasError: true
        }) 
      default:
        return state;
    }
}