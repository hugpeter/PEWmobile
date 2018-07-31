import { 
    REQUEST_DOCUMENTS,
    DOCUMENTS,
    DOCUMENTS_HAVE_ERROR
} from '../actions/documentsActions';
import { DEFAULT_KEY, generateCacheTTL } from "redux-cache";

export default function loginReducer(state = 
    {
        [DEFAULT_KEY]: null,
        isFetchingDocuments: false,
        documentsHaveError: false,
        documents: []
    }, action) {
    switch (action.type) {
      case REQUEST_DOCUMENTS:
        return Object.assign({}, state, {
            isFetchingDocuments: true
        })
      case DOCUMENTS:
        return Object.assign({}, state, {
            [DEFAULT_KEY]: generateCacheTTL(),
            isFetchingDocuments: false,
            documentsHaveError: false,
            documents: action.payload
        })
      case DOCUMENTS_HAVE_ERROR:
        return Object.assign({}, state, {
            isFetchingDocuments: false,
            documentsHaveError: true
        }) 
      default:
        return state;
    }
}