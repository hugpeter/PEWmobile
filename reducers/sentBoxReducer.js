import { 
    REQUEST_SENTBOX, 
    SENTBOX_HAS_ERROR, 
    SENTBOX
} from '../actions/sentBoxActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingSentBox: false,
        sentBoxHasError: false,
        sentBox: []
    }, action) {
    switch (action.type) {
      case REQUEST_SENTBOX:
        return Object.assign({}, state, {
            isFetchingSentBox: true
        })
      case SENTBOX:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetchingSentBox: false,
            sentBoxHasError: false,
            sentBox: action.payload
        })
      case SENTBOX_HAS_ERROR:
        return Object.assign({}, state, {
            isFetchingSentBox: false,
            sentBoxHasError: true
        }) 
      default:
        return state;
    }
}