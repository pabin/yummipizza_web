const HTTP_OR_HTTPS = "http";
// const DOMAIN_NAME = "yummipizza-be-server.herokuapp.com";
const DOMAIN_NAME = "localhost:8000";

// Accounts
const getAuthenticationUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/accounts/api/authentication/`;
const getUserRetrieveOrUpdateUrl = (user_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/accounts/api/user/${user_id}/`;
const getUserSignupUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/accounts/api/signup/`;

// Inventory
const getItemListUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/items/`;
const getItemFilterUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/items-filter/`;
const getItemViewsUpdateUrl = (item_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/item/${item_id}/`;
const getPopularItemListUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/popular-items/`;

const getShoppingCartCreateUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/cart/`;
const getCartRetrieveOrUpdateUrl = (cart_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/cart/${cart_id}/`;
const getCartItemRetrieveOrUpdateUrl = (cart_item_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/cart-item/${cart_item_id}/`;

const getOrderCreateUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/order/`;
const getUserOrderListUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/user-orders/`;
const getUserOrderFilterUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/order-filter/`;

// Reviews and Ratings
const getItemReviewListUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/items-reviews/`;
const getItemReviewCreateUrl = (item_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/review/${item_id}/`;
const getItemRatingListUrl = () =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/items-ratings/`;
const getItemRatingCreateUrl = (item_id) =>
  `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/rating/${item_id}/`;

export {
  getAuthenticationUrl,
  getUserRetrieveOrUpdateUrl,
  getUserSignupUrl,
  getItemListUrl,
  getItemFilterUrl,
  getItemViewsUpdateUrl,
  getPopularItemListUrl,
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
  getCartItemRetrieveOrUpdateUrl,
  getOrderCreateUrl,
  getUserOrderListUrl,
  getUserOrderFilterUrl,
  getItemReviewListUrl,
  getItemReviewCreateUrl,
  getItemRatingListUrl,
  getItemRatingCreateUrl,
};
