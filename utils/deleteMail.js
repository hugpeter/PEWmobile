import fetch from 'cross-fetch';

export function deleteMail(idMensaje, idMaestro, token){
    const postBody = {
        IdxMensaje: idMensaje,
        IdxMaestro: idMaestro
    }

    var options = {
        headers: new Headers({
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
        }),
        method: 'post',
        body: JSON.stringify(postBody)
    }

    fetch(`http://192.168.111.62:3000/api/eliminarMensajeEntrada`, options)
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
        headers: new Headers({
            'content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization' : 'Bearer ' + token
        }),
        method: 'post',
        body: JSON.stringify(postBody)
    }

    fetch(`http://192.168.111.62:3000/api/eliminarMensajeSalida`, options)
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