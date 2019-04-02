import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";
import conn from '../utils/dbConnection';
import { userSessionTimeout } from './userSessionTimeout';
export const REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS';
export const DOCUMENTS = 'DOCUMENTS';
export const DOCUMENTS_HAVE_ERROR = 'DOCUMENTS_HAVE_ERROR';

export function documentsHaveError(bool) {
    return {
        type: DOCUMENTS_HAVE_ERROR,
        payload: bool
    };
}
  
export function fetchingDocuments(bool) {
    return {
        type: REQUEST_DOCUMENTS,
        payload: bool
    };
}
  
export function fetchingDocumentsSuccess(documents) {
    return {
        type: DOCUMENTS,
        payload: documents
    };
}
  
export function documentsFetchData(idColegio, cedula, userId, tipoMaestro, token) {
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "documentsReducer");
        if (isCacheValid) { return null; }
  
        dispatch(fetchingDocuments(true));
  
        const options = {
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          }
        }
        
        console.log(options);

        fetch(`${conn}api/documents?idColegio=${idColegio}&cedula=${cedula}&userID=${userId}&tipoMaestro=${tipoMaestro}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status == 401){
                dispatch(userSessionTimeout(true));
            } else if(response.status != 200){
                dispatch(documentsHaveError(true));
            } else {
                return response.json();
            }
        }
          // Do not use catch, because that will also catch
          // any errors in the dispatch and resulting render,
          // causing a loop of 'Unexpected batch number' errors.
          // https://github.com/facebook/react/issues/6895
        )
        .then(json => {
            if(json){
                dispatch(fetchingDocumentsSuccess(json));
            }
        });
    }
}