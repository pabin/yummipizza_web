
export const ORDER_LIST_FETCH_SUCCESS = 'ORDER_LIST_FETCH_SUCCESS'
export const ORDER_LIST_FETCH_FAILURE = 'ORDER_LIST_FETCH_FAILURE'
export const ORDER_LIST_FETCHING = 'ORDER_LIST_FETCHING'


const initialState = {
  orderListFetched: false,
  orderListFetching: false,
  orderList: {},
  errorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {

    case ORDER_LIST_FETCH_SUCCESS:
    return {
      ...initialState,
      orderListFetched: true,
      orderList: action.orderList,
    }

    case ORDER_LIST_FETCHING:
    return {
      ...initialState,
      orderListFetching: true,
    }

    case ORDER_LIST_FETCH_FAILURE:
    return {
      ...initialState,
      errorMessage: action.errorMessage,
    }

    default:
      return state
  }
}
