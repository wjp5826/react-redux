import * as at from 'constants';

export function saveName(value) {
  return { type: at.NAME, value }
}

export function login(value) {
  return { type: at.ISLOGIN, value }
}