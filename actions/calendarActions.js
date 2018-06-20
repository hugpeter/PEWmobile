import fetch from 'cross-fetch';
import { checkCacheValid } from "redux-cache";

export const REQUEST_CALENDAR_DATA = 'REQUEST_CALENDAR_DATA';
export const CALENDAR = 'CALENDAR';
export const CALENDAR_HAS_ERROR = 'CALENDAR_HAS_ERROR';

export function calendarHasError(bool) {
  return {
      type: CALENDAR_HAS_ERROR,
      payload: bool
  };
}

export function fetchingCalendarData(bool) {
  return {
      type: REQUEST_CALENDAR_DATA,
      payload: bool
  };
}

export function fetchingCalendarDataSuccess(dates) {
  return {
      type: CALENDAR,
      payload: dates
  };
}

export const REQUEST_CALENDAR_DETAIL = 'REQUEST_CALENDAR_DETAIL';
export const CALENDAR_DETAIL_HAS_ERROR = 'CALENDAR_DETAIL_HAS_ERROR';
export const CALENDAR_DETAIL = 'CALENDAR_DETAIL';
export const UPDATE_CALENDAR_DETAIL_INFO = 'UPDATE_CALENDAR_DETAIL_INFO';

export function updateCalendarDetailInfo(idColegio, ano, currentDate, cedula) {
    return {
        type: UPDATE_CALENDAR_DETAIL_INFO,
        payload: {
            idColegioPrev: idColegio,
            anoPrev: ano,
            currentDatePrev: currentDate,
            cedulaPrev: cedula
        }
    };
}

export function calendarDetailHasError(bool) {
    return {
        type: CALENDAR_DETAIL_HAS_ERROR,
        payload: bool
    };
}
  
export function fetchingCalendarDetailData(bool) {
    return {
        type: REQUEST_CALENDAR_DETAIL,
        payload: bool
    };
}
  
export function fetchingCalendarDetailDataSuccess(details) {
    return {
        type: CALENDAR_DETAIL,
        payload: details
    };
}

export function calendarDetailFetchData(idColegio, ano, currentDate, cedula, token){
    return (dispatch, getState) => {
        const isCacheValid = checkCacheValid(getState, "calendarDetailReducer");
        if (isCacheValid) { return null; }

        dispatch(fetchingCalendarDetailData(true));

        const options = {
            headers: new Headers({
              'content-type': 'application/json',
              'Cache-Control': 'no-cache',
              'Authorization' : 'Bearer ' + token
            })
        }

        fetch(`http://192.168.111.62:3000/api/agendaDetalle?idColegio=${idColegio}&ano=${ano}&currentDate=${currentDate}&cedula=${cedula}`, options)
        .then(response => {
            console.log(response.status);
            if(response.status != 200){
                dispatch(calendarDetailHasError(true));
            } else {
                return response.json();
            }
        }
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
        )
        .then(json =>
            {
                if(json){
                    dispatch(fetchingCalendarDetailDataSuccess(json));
                }
            }
        );
    }
}

export function calendarFetchData(idColegio, ano, cedula, bimestre, fechaI, fechaF, token) {
  return (dispatch, getState) => {
      const isCacheValid = checkCacheValid(getState, "calendarReducer");
      if (isCacheValid) { return null; }

      dispatch(fetchingCalendarData(true));

      const options = {
        headers: new Headers({
          'content-type': 'application/json',
          'Cache-Control': 'no-cache',
          'Authorization' : 'Bearer ' + token
        })
      }

      fetch(`http://192.168.111.62:3000/api/agenda?idColegio=${idColegio}&ano=${ano}&cedula=${cedula}&bimestre=${bimestre}&fechaI=${fechaI}&fechaF=${fechaF}`, options)
      .then(response => {
          console.log(response.status);
          if(response.status != 200){
            dispatch(calendarHasError(true));
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
            if(json){
                var dateList = json;
                var finalDateList = {};

                var currentDate = '';
                var prevDate = '';

                dateList.forEach(function(date) {
                    currentDate = date.fecha.slice(0, 10);

                    if(currentDate != prevDate){
                        var eventList = new Array();

                        eventList.push({
                            fecha: currentDate,
                            actividad: date.actividad,
                            titulo: date.titulo
                        });

                        finalDateList[currentDate] = eventList;
                    } else {
                        finalDateList[currentDate].push({
                            fecha: currentDate,
                            actividad: date.actividad,
                            titulo: date.titulo
                        });
                    }

                    prevDate = currentDate;
                });

                dispatch(fetchingCalendarDataSuccess(finalDateList));
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

