import axios from 'axios'

import {
  ITEM_LIST_FETCH_SUCCESS,
  ITEM_LIST_FETCH_FAILURE,
  ITEM_LIST_FETCHING } from '../reducers/ItemListReducers'

import { getItemListUrl } from '../../constants/urls'


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


export function itemListFetch(page_number){
  const ITEM_LIST_URL = getItemListUrl()

  return (dispatch) => {
    dispatch(itemListFetching())
    axios({
            method: "GET",
            url: `${ITEM_LIST_URL}`,
            // data: {
            //   pageNumber: page_number,
            //   filters: {}
            // }
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
