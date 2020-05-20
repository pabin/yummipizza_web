import axios from 'axios'

import {
  getOrderCreateUrl,
} from '../constants/urls'

// import store from "../store/index";


// orderCreate API function to Call OrderCreate API from server
export const orderCreateAPI = async (data) => {
  const TOKEN = localStorage.getItem('token')
  const ORDER_CREATE_CREATE_URL = getOrderCreateUrl()

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${ORDER_CREATE_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
          data: data
        })
    .then(response => {
      const order = response.data
      responseData.data = order
      // console.log('Order create response: ', order);
    })
    .catch(err => {
      // console.log('Error on Order create: ', err)
      responseData.error = err
    });
    return responseData
}
