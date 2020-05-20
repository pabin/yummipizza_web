import axios from 'axios'
import store from '../store'
import { getItemViewsUpdateUrl, getPopularItemListUrl } from '../constants/urls'



export const itemViewsUpdateAPI = async (item_id) => {
  const TOKEN = localStorage.getItem('token')
  var ITEM_VIEWS_UPDATE_URL = getItemViewsUpdateUrl(item_id)

  let responseData = {data: null, error: null}
  await axios({
          method: "PUT",
          url: `${ITEM_VIEWS_UPDATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
        })
    .then(response => {
      responseData.data = true
    })
    .catch(err => {
      responseData.error = err
    });

  return responseData
}



export const popularItemsListAPI = async () => {
  const TOKEN = localStorage.getItem('token')
  var ITEM_VIEWS_UPDATE_URL = getPopularItemListUrl()

  let responseData = {data: null, error: null}
  await axios({
          method: "GET",
          url: `${ITEM_VIEWS_UPDATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
        })
    .then(response => {
      responseData.data = response.data
    })
    .catch(err => {
      responseData.error = err
    });

  return responseData
}
