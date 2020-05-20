export const ITEM_LIST_FETCH_SUCCESS = 'ITEM_LIST_FETCH_SUCCESS'
export const ITEM_LIST_FETCH_FAILURE = 'ITEM_LIST_FETCH_FAILURE'
export const ITEM_LIST_FETCHING = 'ITEM_LIST_FETCHING'


const initialState = {
  itemListFetched: false,
  itemListFetching: false,
  itemList: {},
  backupItemList: {},
  errorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {

    case ITEM_LIST_FETCH_SUCCESS:
    return {
      ...initialState,
      itemListFetched: true,
      itemList: action.itemList,
      backupItemList: action.backupItemList
    }

    case ITEM_LIST_FETCHING:
    return {
      ...initialState,
      itemListFetching: true,
    }

    case ITEM_LIST_FETCH_FAILURE:
    return {
      ...initialState,
      errorMessage: action.errorMessage,
    }

    default:
      return state
  }
}
