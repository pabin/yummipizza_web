import axios from 'axios'

import {
  getUserSignupUrl,
} from '../constants/urls'


// User signup API function to Call user register API from server
export const userSignupAPI = async (data) => {
  const TOKEN = localStorage.getItem('token')
  const USER_SIGNUP_URL = getUserSignupUrl()

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${USER_SIGNUP_URL}`,
          data: data
        })
    .then(response => {
      const order = response.data
      responseData.data = order
      // console.log('User signup response: ', order);
    })
    .catch(err => {
      // console.log('Error on User signup: ', err)
      responseData.error = err
    });
    return responseData
}
