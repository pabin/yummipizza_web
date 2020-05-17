import { combineReducers } from 'redux';

import itemList from './ItemListReducers';
import authentication from './AuthenticationReducers';


export default combineReducers({
  itemList,
  authentication,
})
