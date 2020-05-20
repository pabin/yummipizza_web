export const COMMENT_FETCH_SUCCESS = 'COMMENT_FETCH_SUCCESS'
export const COMMENT_FETCH_FAILURE = 'COMMENT_FETCH_FAILURE'
export const COMMENT_FETCHING = 'COMMENT_FETCHING'


const initialState = {
  commentFetched: false,
  commentFetching: false,
  comments: [],
  errorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {

    case COMMENT_FETCH_SUCCESS:
    return {
      ...initialState,
      commentFetched: true,
      commentFetching: true,
      comments: action.comments
    }

    case COMMENT_FETCHING:
    return {
      ...initialState,
      commentFetching: true,
    }

    case COMMENT_FETCH_FAILURE:
    return {
      ...initialState,
      errorMessage: action.errorMessage,
    }

    default:
      return state
  }
}
