import { combineReducers } from 'redux';

import authentication from './AuthenticationReducers';
import itemList from './ItemListReducers';
import orderList from './OrderListReducers';


export default combineReducers({
  authentication,
  itemList,
  orderList,
})
