import fetch from 'cross-fetch';

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
        Asunto: m.asunto,
        Contenido: m.contenido,
        Urgente: m.urgente,
        Archivo: m.archivo,
        ParaApps: m.paraApps,
        backgrount: m.backgrount
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

    fetch(`http://192.168.111.62:3000/api/enviarMensaje`, options)
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