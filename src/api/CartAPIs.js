import axios from 'axios'

import {
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
} from '../constants/urls'

import store from "../store/index";


export const shoppingCartCreateAPI = async (data) => {
  const SHOPPING_CART_CREATE_URL = getShoppingCartCreateUrl()
  const { token } = store.getState().authentication

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${SHOPPING_CART_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + token},
          data: data
        })
    .then(response => {
      const shoppingCart = response.data
      responseData.data = shoppingCart
      console.log('shoppig cart create response: ', shoppingCart);
    })
    .catch(err => {
      console.log('Error on Shopping cart create: ', err)
      responseData.error = err
    });
    return responseData
}


export const shoppingCartUpdateAPI = async (data, cart_id) => {
  const SHOPPING_CART_UPDATE_URL = getCartRetrieveOrUpdateUrl(cart_id)
  const { token } = store.getState().authentication

  console.log('data @ api', data);

  let responseData = {data: null, error: null}
  await axios({
          method: "PUT",
          url: `${SHOPPING_CART_UPDATE_URL}`,
          headers: {'Authorization': 'Token ' + token},
          data: data
        })
    .then(response => {
      const shoppingCart = response.data
      responseData.data = shoppingCart
      console.log('Shoppig cart update response: ', shoppingCart);
    })
    .catch(err => {
      console.log('Error on Shopping cart update: ', err)
      responseData.error = err
    });
    return responseData
}
