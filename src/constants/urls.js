const HTTP_OR_HTTPS = "https";
const DOMAIN_NAME = "http://localhost:8000/";

// Accounts
const getAuthenticationUrl = () => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/accounts/api/authentication/`;
const getUserRetrieveOrUpdateUrl = (user_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/account/api/user/${user_id}/`;

// Inventory
const getItemListUrl = (user_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/items/${user_id}/`;
const getShoppingCartCreateUrl = () => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/cart/`;
const getCartRetrieveOrUpdateUrl = (cart_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/cart/${cart_id}/`;
const getOrderCreateUrl = () => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/order/`;
const getUserOrderListUrl = (cart_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/inventory/api/user-orders/`;

// Reviews and Ratings
const getItemReviewListUrl = () => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/items-reviews/`;
const getItemReviewCreateUrl = (item_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/review/${item_id}/`;
const getItemRatingListUrl = () => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/items-ratings/`;
const getItemRatingCreateUrl = (item_id) => `${HTTP_OR_HTTPS}://${DOMAIN_NAME}/reviews/api/rating/${item_id}/`;



export {
  getAuthenticationUrl,
  getItemListUrl,

  getItemListUrl,
  getShoppingCartCreateUrl,
  getCartRetrieveOrUpdateUrl,
  getOrderCreateUrl,
  getUserOrderListUrl,

  getItemReviewListUrl,
  getItemReviewCreateUrl,
  getItemRatingListUrl,
  getItemRatingCreateUrl,
}
