import axios from 'axios'

import {
  ORDER_LIST_FETCH_SUCCESS,
  ORDER_LIST_FETCH_FAILURE,
  ORDER_LIST_FETCHING } from '../reducers/OrderListReducers'

import { getUserOrderListUrl } from '../../constants/urls'
// import store from "../index";


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


export function orderListFetch(){
  const TOKEN = localStorage.getItem('token')
  const ORDER_LIST_URL = getUserOrderListUrl()

  return (dispatch) => {
    dispatch(orderListFetching())
    axios({
            method: "GET",
            url: `${ORDER_LIST_URL}`,
            headers: {'Authorization': 'Token ' + TOKEN},
            // data: {
            //   pageNumber: page_number,
            //   filters: {}
            // }
          })
      .then(response => {
        const orderList = response.data
        // console.log('Order List @ actions ', JSON.stringify(orderList))
        dispatch(orderListFetchSuccess(orderList))
      })
      .catch(err => {
        console.log('Error on Order List Fetch: ', err)
        dispatch(orderListFetchFailure(err))
      });
  }

}
