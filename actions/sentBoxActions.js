import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";
import conn from '../utils/dbConnection';
export const REQUEST_SENTBOX = 'REQUEST_SENTBOX';
export const SENTBOX = 'SENTBOX';
export const SENTBOX_HAS_ERROR = 'SENTBOX_HAS_ERROR';

export function sentBoxHasError(bool) {
    return {
        type: SENTBOX_HAS_ERROR,
        payload: bool
    };
}
  
export function fetchingSentBox(bool) {
    return {
        type: REQUEST_SENTBOX,
        payload: bool
    };
}
  
export function fetchingSentBoxSuccess(sentBox) {
    return {
        type: SENTBOX,
        payload: sentBox
    };
}
  
export function sentBoxFetchData(idColegio, cedula, token) {
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "sentBoxReducer");
        if (isCacheValid) { return null; }
  
        dispatch(fetchingSentBox(true));
  
        const options = {
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          }
        }
  
        fetch(`${conn}api/sent?idColegio=${idColegio}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
              dispatch(sentBoxHasError(true));
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
                dispatch(fetchingSentBoxSuccess(json));
            }
        });
    }
}