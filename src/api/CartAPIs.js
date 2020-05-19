import axios from 'axios'

import {
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
} from '../constants/urls'

// import store from "../store/index";


// Create new shoppping cart for user, and add item to it, valid for 10 minutes
export const shoppingCartCreateAPI = async (data) => {
  const TOKEN = localStorage.getItem('token')
  const SHOPPING_CART_CREATE_URL = getShoppingCartCreateUrl()

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${SHOPPING_CART_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
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


// Update items to existing valid cart of user
export const shoppingCartUpdateAPI = async (data, cart_id) => {
  const TOKEN = localStorage.getItem('token')
  const SHOPPING_CART_UPDATE_URL = getCartRetrieveOrUpdateUrl(cart_id)

  console.log('data @ api', data);

  let responseData = {data: null, error: null}
  await axios({
          method: "PUT",
          url: `${SHOPPING_CART_UPDATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
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
