import fetch from 'cross-fetch';
import conn from './dbConnection';

const sendMail = (m, token) => {
    const postBody = {
        idColegio: m.idColegio,

        RemidxMaestro: m.remidxMaestro,
        RemTipoMaestro: m.remTipoMaestro,
        RemCedula: m.remCedula,
        RemNombre: m.remNombre,

        RespondeAidxMsg: m.respondeAidxMsg,

        DesidxMaestro: m.desidxMaestro,
        DesNombre: m.desNombre,
        DesidxMaestroCC: m.desidxMaestroCC,
        DesNombreCC: m.desNombreCC,

        DesidxMaestroCCO: m.desidxMaestroCCO,
        DesNombreCCO: m.desNombreCCO,

        Asunto: m.asunto,
        Contenido: m.contenido,
        Urgente: m.urgente,
        Archivo: m.archivo,
        ParaApps: m.paraApps,
        background: m.background
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

    fetch(`${conn}api/enviarMensaje`, options)
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

export default sendMail;