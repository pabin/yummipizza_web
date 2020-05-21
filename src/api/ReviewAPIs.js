import axios from 'axios'
import store from '../store'
import { getItemReviewCreateUrl, getItemRatingCreateUrl  } from '../constants/urls'



export const commentCreateAPI = async (message, user_id, item_id) => {
  const TOKEN = localStorage.getItem('token')
  var COMMENT_CREATE_URL = getItemReviewCreateUrl(item_id)

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${COMMENT_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
          data: {
            message: message,
            user_id: user_id
          }
        })
    .then(response => {
      responseData.data = response.data
      // console.log('Comment Create Response: ', responseData.data);
    })
    .catch(err => {
      responseData.error = err
      console.log('Error on Comment Create: ', err)
    });

  return responseData
}


export const ratingCreateAPI = async (rating, user_id, item_id) => {
  const TOKEN = localStorage.getItem('token')
  var RATING_CREATE_URL = getItemRatingCreateUrl(item_id)

  let responseData = {data: null, error: null}
  await axios({
          method: "POST",
          url: `${RATING_CREATE_URL}`,
          headers: {'Authorization': 'Token ' + TOKEN},
          data: {
            rating: rating,
            user: user_id
          }
        })
    .then(response => {
      responseData.data = response.data
      // console.log('Item Rating Create Response: ', responseData.data);
    })
    .catch(err => {
      responseData.error = err
      // console.log('Error on Rating Create: ', err)
    });

  return responseData
}
