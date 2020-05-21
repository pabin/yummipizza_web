import axios from 'axios'

import {
  getUserSignupUrl,
} from '../constants/urls'


// User signup API function to Call user register API from server
export const userSignupAPI = async (data) => {
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
    })
    .catch(err => {
      responseData.error = err
    });
    return responseData
}
