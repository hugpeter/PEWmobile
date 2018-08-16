import fetch from 'cross-fetch';
import conn from './dbConnection';

export function deleteMail(idMensaje, idMaestro, token){
    const postBody = {
        IdxMensaje: idMensaje,
        IdxMaestro: idMaestro
    }

    var options = {
        headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
        },
        method: 'post',
        body: JSON.stringify(postBody)
    }

    fetch(`${conn}api/eliminarMensajeEntrada`, options)
    .then(response => {
        console.log(response.status);
        if(response.status != 200){

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

        }
    });
}

export function deleteSentMail(idMensaje, idMaestro, token){
    const postBody = {
        IdxMensaje: idMensaje,
        IdxMaestro: idMaestro
    }

    var options = {
        headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
        },
        method: 'post',
        body: JSON.stringify(postBody)
    }

    fetch(`${conn}api/eliminarMensajeSalida`, options)
    .then(response => {
        console.log(response.status);
        if(response.status != 200){

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

        }
    });
}