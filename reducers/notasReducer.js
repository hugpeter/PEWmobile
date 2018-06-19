import { 
    REQUEST_NOTAS, 
    NOTAS_HAVE_ERROR, 
    NOTAS 
} from '../actions/notasActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetching: false,
        hasError: false,
        notas: []
    }, action) {
    switch (action.type) {
      case REQUEST_NOTAS:
        return Object.assign({}, state, {
            isFetching: true
        })
      case NOTAS:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetching: false,
            hasError: false,
            notas: action.payload
        })
      case NOTAS_HAVE_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      default:
        return state;
    }
}