import axios from 'axios'

import {
  ITEM_LIST_FETCH_SUCCESS,
  ITEM_LIST_FETCH_FAILURE,
  ITEM_LIST_FETCHING } from '../reducers/ItemListReducers'

import { getItemListUrl, getItemFilterUrl } from '../../constants/urls'


function itemListFetchSuccess(itemList) {
  return {
    type: ITEM_LIST_FETCH_SUCCESS,
    itemList: itemList,
  }
}

function itemListFetching() {
  return {
    type: ITEM_LIST_FETCHING,
  }
}


function itemListFetchFailure(err) {
  return {
    type: ITEM_LIST_FETCH_FAILURE,
    errorMessage: err,
  }
}


export function itemListFetch(data){
  const ITEM_LIST_URL = getItemListUrl()
  const ITEM_FILTER_URL = getItemFilterUrl()

  URL = data ? ITEM_FILTER_URL : ITEM_LIST_URL

  return (dispatch) => {
    dispatch(itemListFetching())
    axios({
            method: "GET",
            url: `${URL}`,
            params: data ? data : null
          })
      .then(response => {
        const itmeList = response.data
        console.log('Items List @ actions ', itmeList)
        dispatch(itemListFetchSuccess(itmeList))
      })
      .catch(err => {
        console.log('Error on Items List Fetch: ', err)
        dispatch(itemListFetchFailure(err))
      });
  }

}
