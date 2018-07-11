import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";

export const REQUEST_NOTAS = 'REQUEST_NOTAS';
export const NOTAS = 'NOTAS';
export const NOTAS_HAVE_ERROR = 'NOTAS_HAVE_ERROR';

export function notasHaveError(bool) {
  return {
      type: NOTAS_HAVE_ERROR,
      payload: bool
  };
}

export function fetchingNotas(bool) {
  return {
      type: REQUEST_NOTAS,
      payload: bool
  };
}

export function fetchingNotasSuccess(notas) {
  return {
      type: NOTAS,
      payload: notas
  };
}

export function notasFetchData(ano, idColegio, idioma, cedula, bimestre, token) {
  return (dispatch, getState) => {
      const isCacheValid = checkCacheValid(getState, "notasReducer");
      if (isCacheValid) { return null; }

      dispatch(fetchingNotas(true));

      const postBody = {
        idcolegio: idColegio,
        ano: ano,
        bimestre: bimestre,
        cedula: cedula
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

      fetch(`http://192.168.111.62:3000/api/boletin`, options)
      .then(response => {
          console.log(response.status);
          if(response.status != 200){
            dispatch(notasHaveError(true));
          } else {
            return response.json();
          }
      }
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
      )
      .then (json =>
        {
            console.log(json);
            notas = new Array();
            var notasList = json;

            options = {
              headers: new Headers({
                'content-type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization' : 'Bearer ' + token
              })
            }

            if(json){
              //take list of classes and store in notas object  
              const getNotasDetalle = async () => {
                await asyncForEach(notasList, async (currentNota) => {
                  await fetch(`http://192.168.111.62:3000/api/notasDetalle?ano=${ano}&bimestre=${bimestre}&idColegio=${idColegio}&idioma=${idioma}&cedula=${cedula}&codmat=${currentNota.codmat}`, options)
                  .then(response => {
                      console.log(response.status);
                      if(response.status != 200){
                          dispatch(notasHaveError(true));
                      } else {
                          return response.json();
                      }
                  })
                  .then(json => {
                      if(json){
                          var nota = {};
                          var assignmentsPre = json;
                          var assignmentsPost = [];

                          nota.class = currentNota.nommat;

                          //loop through assignments and find the average grade for the class
                          assignmentsPre.forEach(function(assignment) {
                            assignmentsPost.push({
                              item: assignment.item,
                              grade: assignment.calificacion
                            });
                          });

                          //get average grade for the class
                          nota.average = currentNota.I;
                          nota.needed = 0;
                          nota.assignments = assignmentsPost;

                          notas.push(nota);
                      }
                  });
                });

                dispatch(fetchingNotasSuccess(notas));
              }
              getNotasDetalle();
            }
        }
      );
  }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

