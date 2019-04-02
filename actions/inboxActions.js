import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";
import conn from '../utils/dbConnection';
import { userSessionTimeout } from './userSessionTimeout';
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
        const isCacheValid = checkCacheValid(getState, "inboxReducer");
        if (isCacheValid) { return null; }
  
        dispatch(fetchingInbox(true));
  
        const options = {
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          }
        }
  
        fetch(`${conn}api/inbox?idColegio=${idColegio}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status == 401){
                dispatch(userSessionTimeout(true));
            } else if(response.status != 200){
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

export const REQUEST_NMC = 'REQUEST_NMC';
export const NMC = 'NMC';
export const NMC_HAS_ERROR = 'NMC_HAS_ERROR';

export function fetchingNMC(bool){
    return {
        type: REQUEST_NMC,
        payload: bool
    };
}

export function nmcHasError(bool){
    return {
        type: NMC_HAS_ERROR,
        payload: bool
    };
}

export function fetchingNMCSuccess(nmc){
    return {
        type: NMC,
        payload: nmc
    };
}

export function getNewMessageCount(idColegio, cedula, token){
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "inboxReducer");
        if (isCacheValid) { return null; }

        dispatch(fetchingNMC(true));

        var options = {
            headers: {
                'content-type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': 'Bearer ' + token
            }
        }

        fetch(`${conn}api/newMessageCount?idColegio=${idColegio}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status == 401){
                dispatch(userSessionTimeout(true));
            } else if(response.status != 200){
                dispatch(nmcHasError(true));
            } else {
                return response.json();
            }
        })
        .then(json => {
            if(json){
                console.log(json[0].Cantidad);

                dispatch(fetchingNMCSuccess(json[0].Cantidad));
            }
        })
    }
}

export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const MESSAGE = 'MESSAGE';
export const MESSAGE_HAS_ERROR = 'MESSAGE_HAS_ERROR';
export const MESSAGE_READ = 'MESSAGE_READ';

export function messageHasError(bool) {
    return {
        type: MESSAGE_HAS_ERROR,
        payload: bool
    };
}
  
export function fetchingMessage(bool) {
    return {
        type: REQUEST_MESSAGE,
        payload: bool
    };
}
  
export function fetchingMessageSuccess(message) {
    return {
        type: MESSAGE,
        payload: message
    };
}

export function messageIsRead(idMensaje){
    return {
        type: MESSAGE_READ,
        payload: idMensaje
    }
}

export function messageFetchData(idMensaje, idxMaestro, tipoMaestro, token){
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "messagesReducer");
        const messages = getState().messagesReducer.messages;
        const message = messages.filter(message => message.idxMensaje == idMensaje);
        if (isCacheValid && message.length != 0) { return null; }
  
        dispatch(fetchingMessage(true));
  
        var options = {
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
          }
        }
  
        fetch(`${conn}api/mensaje?idMensaje=${idMensaje}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status == 401){
                dispatch(userSessionTimeout(true));
            } else if(response.status != 200){
                dispatch(messageHasError(true));
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
                
                fetch(`${conn}api/mensajeLeido?idMensaje=${idMensaje}&idxMaestro=${idxMaestro}&tipoMaestro=${tipoMaestro}`, options)
                .then(response => {
                    console.log(response.status);
                    if(response.status == 401){
                        dispatch(userSessionTimeout(true));
                    } else if(response.status != 200){
                        dispatch(messageHasError(true));
                    } else {
                        dispatch(fetchingMessageSuccess(json[0]));
                    }
                })
            }
        });
    }
}