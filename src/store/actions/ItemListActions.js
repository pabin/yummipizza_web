import axios from 'axios'

import {
  ITEM_LIST_FETCH_SUCCESS,
  ITEM_LIST_FETCH_FAILURE,
  ITEM_LIST_FETCHING } from '../reducers/ItemListReducers'

import { getItemListUrl, getItemFilterUrl, getItemSortingUrl } from '../../constants/urls'


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
  if (data.filter) {
    var URL = getItemFilterUrl()
    var params = data.data
  } else if (data.list) {
    var URL = getItemListUrl()
    var params = null
  }

  return (dispatch) => {
    dispatch(itemListFetching())
    axios({
            method: "GET",
            url: `${URL}`,
            params: params
          })
      .then(response => {
        const itmeList = response.data
        // console.log('Items List @ actions ', itmeList)
        dispatch(itemListFetchSuccess(itmeList))
      })
      .catch(err => {
        // console.log('Error on Items List Fetch: ', err)
        dispatch(itemListFetchFailure(err))
      });
  }

}
