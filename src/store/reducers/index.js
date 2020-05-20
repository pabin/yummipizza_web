import { combineReducers } from 'redux';

import authentication from './AuthenticationReducers';
import itemList from './ItemListReducers';
import orderList from './OrderListReducers';
import comments from './CommentReducers';


export default combineReducers({
  authentication,
  itemList,
  orderList,
  comments,
})
