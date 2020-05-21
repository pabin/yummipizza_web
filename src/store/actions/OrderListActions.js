import axios from 'axios'

import {
  ORDER_LIST_FETCH_SUCCESS,
  ORDER_LIST_FETCH_FAILURE,
  ORDER_LIST_FETCHING } from '../reducers/OrderListReducers'

import { getUserOrderListUrl, getUserOrderFilterUrl } from '../../constants/urls'


function orderListFetchSuccess(orderList) {
  return {
    type: ORDER_LIST_FETCH_SUCCESS,
    orderList: orderList,
  }
}

function orderListFetching() {
  return {
    type: ORDER_LIST_FETCHING,
  }
}


function orderListFetchFailure(err) {
  return {
    type: ORDER_LIST_FETCH_FAILURE,
    errorMessage: err,
  }
}


export function orderListFetch(data){
  const TOKEN = localStorage.getItem('token')

  let URL;
  let params;
  if (data.filter) {
    URL = getUserOrderFilterUrl()
    params = data.data
  } else if (data.list) {
    URL = getUserOrderListUrl()
    params = null
  }

  return (dispatch) => {
    dispatch(orderListFetching())
    axios({
            method: "GET",
            url: `${URL}`,
            headers: {'Authorization': 'Token ' + TOKEN},
            params: params
          })
      .then(response => {
        const orderList = response.data
        // console.log('Order List @ actions ', JSON.stringify(orderList))
        dispatch(orderListFetchSuccess(orderList))
      })
      .catch(err => {
        // console.log('Error on Order List Fetch: ', err)
        dispatch(orderListFetchFailure(err))
      });
  }

}
