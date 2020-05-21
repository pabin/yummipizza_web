import {
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAILURE,
  COMMENT_FETCHING } from '../reducers/CommentReducers'

import { getItemReviewListUrl } from '../../constants/urls'

import axios from 'axios'



export function commentFetchSuccess(comments) {
  console.log('Commnet Fetch Successful...');
  return {
    type: COMMENT_FETCH_SUCCESS,
    comments: comments,
  }
}

function commentFetching() {
  console.log('Comment Fetching...');
  return {
    type: COMMENT_FETCHING,
  }
}


function commentFetchFailure(err) {
  return {
    type: COMMENT_FETCH_FAILURE,
    errorMessage: err,
  }
}


export function commentFetch(item_id){
  var COMMENT_LIST_URL = getItemReviewListUrl()

  return (dispatch) => {
    dispatch(commentFetching())
    axios({
            method: "GET",
            url: `${COMMENT_LIST_URL}`,
            params: { item_id: item_id }
          })
      .then(response => {
        const comments = response.data
        setTimeout(() => {
          dispatch(commentFetchSuccess(comments))
        }, 2000);
      })
      .catch(err => {
        console.log('Error on Comment Fetch: ', err)
        dispatch(commentFetchFailure(err))
      });
  }

}
