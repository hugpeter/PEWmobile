import fetch from 'cross-fetch';

export const REQUEST_SESSION = 'REQUEST_SESSION';
export const SESSION = 'SESSION';
export const SESSION_HAS_ERROR = 'SESSION_HAS_ERROR';
export const CHANGE_FAMILY_MEMBER = 'CHANGE_FAMILY_MEMBER';

export function changeFamilyMember(index){
  return {
    type: CHANGE_FAMILY_MEMBER,
    payload: index
  }
}

export function sessionHasError(bool) {
  return {
      type: SESSION_HAS_ERROR,
      payload: bool
  };
}

export function sessionIsLoading(bool) {
  return {
      type: REQUEST_SESSION,
      payload: bool
  };
}

export function sessionFetchDataSuccess(session) {
  return {
      type: SESSION,
      payload: session
  };
}

export function sessionFetchData(url) {
  return (dispatch) => {
      dispatch(sessionIsLoading(true));

      const options = {
        headers: new Headers({
          'content-type': 'application/json',
          'Cache-Control': 'no-cache'
        })
      }

      fetch(url, options)
      .then(response => {
          console.log(response.status);
          if(response.status != 200){
            dispatch(sessionHasError(true));
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
        //update login state with successful login data
        {
            if(json){
              dispatch(sessionFetchDataSuccess(json));
            }
            
        }
      );
  }
}

