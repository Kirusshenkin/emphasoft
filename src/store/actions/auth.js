import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR} from './actionTypes'
// import axios from 'axios'
import axios from '../../axios/http-axios'

export function auth(username, password) {
    return async dispatch => {
        const authData = {
            username, password,
            returnSecureToken: true
        }
        await axios.post('api-token-auth/', authData).then(function (response) {
              dispatch(authSuccess(response.data.Token))
              localStorage.setItem('token', response.data.token)
            }).catch(function (error) {
            dispatch(authError('не правильный логин или пароль'))
        }).then(function(time) {
          dispatch(autoLogout(60 * 60 * 24 * 7))
        })
      //   try {
      //     await axios.post('api-token-auth/', authData).then(function (response) {
      //       dispatch(authSuccess(response.data.Token))
      //       dispatch(push('/Table'))
      //       localStorage.setItem('token', response.data.token)
      //     })
      // } catch {
      //   dispatch(authError('не правильный логин или пароль'))
      // }

      const expirationDate = new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000)
      
      // localStorage.setItem('token', data.idToken)
      // localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      // dispatch()
      // dispatch(authSuccess(res.data.Token))
    }
}

export function autoLogout(time) {
  return dispatch => {
      setTimeout(() => {
          dispatch(logout())
      }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        error: error
    }
}

export function autoLogin() {
    return dispatch => {
      const token = localStorage.getItem('token')
      if (!token) {
        dispatch(logout())
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
          dispatch(logout())
        } else {
          dispatch(authSuccess(token))
          dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())))
        }
      }
    }
}

export function authSuccess(token) {
    return {
      type: AUTH_SUCCESS,
      token
    }
  }
  