import axios from 'axios'

import {
  getOrderCreateUrl,
} from '../constants/urls'

import store from "../store/index";



export const orderCreateAPI = async (data) => {
  const ORDER_CREATE_CREATE_URL = getOrderCreateUrl()
  const { token } = store.getState().authentication

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${ORDER_CREATE_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + token},
          data: data
        })
    .then(response => {
      const order = response.data
      responseData.data = order
      console.log('Order create response: ', order);
    })
    .catch(err => {
      console.log('Error on Order create: ', err)
      responseData.error = err
    });
    return responseData
}
