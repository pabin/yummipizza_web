import axios from 'axios'

import {
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
} from '../constants/urls'

import store from "../store/index";


export const shoppingCartCreateAPI = async (data) => {
  const SHOPPING_CART_CREATE_URL = getShoppingCartCreateUrl()
  const { token } = store.getState().userAuthentication

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


}
