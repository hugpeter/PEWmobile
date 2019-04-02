export const TIMEOUT = 'TIMEOUT';

export function userSessionTimeout(bool) {
    return {
        type: TIMEOUT,
        payload: bool
    };
  }