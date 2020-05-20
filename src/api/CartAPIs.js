import axios from 'axios'

import {
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
  getCartItemRetrieveOrUpdateUrl,
} from '../constants/urls'



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
      // console.log('shoppig cart create response: ', shoppingCart);
    })
    .catch(err => {
      // console.log('Error on Shopping cart create: ', err)
      responseData.error = err
    });
    return responseData
}


// Update items to existing valid cart of user
export const shoppingCartUpdateAPI = async (data, cart_id) => {
  const TOKEN = localStorage.getItem('token')
  const SHOPPING_CART_UPDATE_URL = getCartRetrieveOrUpdateUrl(cart_id)

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
      // console.log('Shoppig cart update response: ', shoppingCart);
    })
    .catch(err => {
      // console.log('Error on Shopping cart update: ', err)
      responseData.error = err
    });
    return responseData
}


// Update items to existing valid cart of user
export const shoppingCartItemUpdateAPI = async (data, cart_item_id) => {
  const TOKEN = localStorage.getItem('token')
  const SHOPPING_CART_ITEM_UPDATE_URL = getCartItemRetrieveOrUpdateUrl(cart_item_id)

  let responseData = {data: null, error: null}
  await axios({
          method: "PUT",
          url: `${SHOPPING_CART_ITEM_UPDATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
          data: data
        })
    .then(response => {
      const shoppingCart = response.data
      responseData.data = shoppingCart
      // console.log('Shoppig cart item update response: ', shoppingCart);
    })
    .catch(err => {
      // console.log('Error on Shopping cart item update: ', err)
      responseData.error = err
    });
    return responseData
}


// Delete Cart Item
export const cartItemDeleteAPI = async (cart_item_id) => {
  const TOKEN = localStorage.getItem('token')
  const CART_ITEM_DELETE_URL = getCartItemRetrieveOrUpdateUrl(cart_item_id)

  let responseData = {data: null, error: null}
  await axios({
          method: "DELETE",
          url: `${CART_ITEM_DELETE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
        })
    .then(response => {
      const shoppingCart = response.data
      responseData.data = true
    })
    .catch(err => {
      console.log('Error on Shopping cart delete: ', err)
      responseData.error = err
    });
    return responseData
}
