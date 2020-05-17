import {
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_FAILURE,
  USER_AUTHENTICATING } from '../reducers/AuthenticationReducers'

import { getAuthenticationUrl } from '../../constants/urls'

import axios from 'axios'



function userAuthenticationSuccess(token, username, userid) {
  console.log('User Authentication Success...')
  return {
    type: USER_AUTHENTICATION_SUCCESS,
    token: token,
    username: username,
    userid: userid,
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
        const username = userDetails.user.username
        const userid = (userDetails.user.id).toString()

        localStorage.setItem('token', token)
        localStorage.setItem('accountId', userid)
        localStorage.setItem('username', username)

        console.log('User Details: ', userDetails)
        dispatch(userAuthenticationSuccess(token, username, userid))

      })
      .catch(err => {
        console.log('Error on User Authentication: ', err)
        dispatch(userAuthenticationFailure(err))
      });
  }

}
