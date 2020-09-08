import {AUTH_SUCCESS, AUTH_LOGOUT ,AUTH_ERROR} from './actionTypes'
import axios from '../../axios/http-axios'

export function auth(username, password) {
    return async dispatch => {
        const authData = {
            username, password,
            returnSecureToken: true
        }
        try {
          await axios.post('api-token-auth/', authData).then(function (response) {
            dispatch(authSuccess(response.data.token))
            localStorage.setItem('token', response.data.token)
          })
      } catch {
        dispatch(authError('не правильный логин или пароль'))
      }

    }
}

export function logout() {
  localStorage.removeItem('token')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
      const token = localStorage.getItem('token')
      if (!token) {
      } else {
          dispatch(authSuccess(token))
      }
  }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error: error
    }
}

export function authSuccess(token) {
    return {
      type: AUTH_SUCCESS,
      token
    }
  }
  