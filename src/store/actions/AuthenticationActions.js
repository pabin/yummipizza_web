import {
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_FAILURE,
  USER_AUTHENTICATING } from '../reducers/AuthenticationReducers'

import { getAuthenticationUrl } from '../../constants/urls'

import axios from 'axios'



export function userAuthenticationSuccess(token, user) {
  console.log('User Authentication Success...')
  return {
    type: USER_AUTHENTICATION_SUCCESS,
    token: token,
    user: user,
  }
}

function userAuthenticating() {
  console.log('User Authenticating...')
  return {
    type: USER_AUTHENTICATING,
  }
}


function userAuthenticationFailure(err) {
  return {
    type: USER_AUTHENTICATION_FAILURE,
    errorMessage: err,
  }
}


export function userAuthentication(username, password){
  var USER_AUTHENTICATION_URL = getAuthenticationUrl()

  return (dispatch) => {
    dispatch(userAuthenticating())

    axios({
            method: "POST",
            url: `${USER_AUTHENTICATION_URL}`,
            data: {
              "username": username,
              "password": password,
            }
          })
      .then(response => {
        const userDetails = response.data
        const token = userDetails.token
        const userid = (userDetails.user.id).toString()
        const user = userDetails.user

        localStorage.setItem('token', token)
        localStorage.setItem('userid', userid)
        localStorage.setItem('username', user.username)

        console.log('User Details: ', userDetails)
        dispatch(userAuthenticationSuccess(token, user))

      })
      .catch(err => {
        console.log('Error on User Authentication: ', err)
        dispatch(userAuthenticationFailure(err))
      });
  }

}
