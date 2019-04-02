import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";
import conn from '../utils/dbConnection';
import { userSessionTimeout } from './userSessionTimeout';
export const REQUEST_DELETEDBOX = 'REQUEST_DELETEDBOX';
export const DELETEDBOX = 'DELETEDBOX';
export const DELETEDBOX_HAS_ERROR = 'DELETEDBOX_HAS_ERROR';

export function deletedBoxHasError(bool) {
    return {
        type: DELETEDBOX_HAS_ERROR,
        payload: bool
    };
}
  
export function fetchingDeletedBox(bool) {
    return {
        type: REQUEST_DELETEDBOX,
        payload: bool
    };
}
  
export function fetchingDeletedBoxSuccess(deletedBox) {
    return {
        type: DELETEDBOX,
        payload: deletedBox
    };
}
  
export function deletedBoxFetchData(idColegio, cedula, token) {
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "deletedBoxReducer");
        if (isCacheValid) { return null; }
  
        dispatch(fetchingDeletedBox(true));
  
        const options = {
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          }
        }
  
        fetch(`${conn}api/deleted?idColegio=${idColegio}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status == 401){
                dispatch(userSessionTimeout(true));
            } else if(response.status != 200){
                dispatch(deletedBoxHasError(true));
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
                dispatch(fetchingDeletedBoxSuccess(json));
            }
        });
    }
}