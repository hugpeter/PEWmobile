import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";

export const REQUEST_INBOX = 'REQUEST_INBOX';
export const INBOX = 'INBOX';
export const INBOX_HAS_ERROR = 'INBOX_HAS_ERROR';

export function inboxHasError(bool) {
    return {
        type: INBOX_HAS_ERROR,
        payload: bool
    };
}
  
export function fetchingInbox(bool) {
    return {
        type: REQUEST_INBOX,
        payload: bool
    };
}
  
export function fetchingInboxSuccess(inbox) {
    return {
        type: INBOX,
        payload: inbox
    };
}
  
export function inboxFetchData(idColegio, cedula, token) {
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "notasReducer");
        if (isCacheValid) { return null; }
  
        dispatch(fetchingInbox(true));
  
        const options = {
          headers: new Headers({
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          })
        }
  
        fetch(`http://192.168.111.62:3000/api/inbox?idColegio=${idColegio}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
              dispatch(inboxHasError(true));
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
                dispatch(fetchingInboxSuccess(json));
            }
        });
    }
}