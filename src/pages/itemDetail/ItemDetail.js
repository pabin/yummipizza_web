import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Form,
  Card,
  Badge
} from 'react-bootstrap';

import './ItemDetail.css'
import QuantityCalculator from '../../components/QuantityCalculator'
import Rating from '../../components/Rating'
import Spinner from '../../components/Spinner'

import Message from '../../components/Message'
import FullScreenLoading from '../../components/FullScreenLoading'

import { shoppingCartCreateAPI, shoppingCartUpdateAPI } from '../../api/CartAPIs';
import { commentCreateAPI, ratingCreateAPI } from '../../api/ReviewAPIs';
import { itemViewsUpdateAPI, popularItemsListAPI, getItemDetailsAPI } from '../../api/ItemAPIs';

import { userAuthenticationSuccess } from '../../store/actions/AuthenticationActions';
import { commentFetchSuccess } from '../../store/actions/CommentActions';
import { commentFetch } from '../../store/actions/CommentActions';


// Item detail page, displays all the details of a particular item
// User can rate a item and give reviews from this page
class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSuccessMessage: false,
      showFailureMessage: false,
      successMessage: "Added Successfully",
      failureMessage: "",
      itemSize: "LARGE",
      quantity: 1,
      comment: "",
      popularItems: [],
      itemFetched: false,
      loading: false,
      fetchingItem: true,
      itemDetails: {},
    }

    const item_id = this.props.location.state.item.id
    this.itemDetailsFetch()
    this.props.dispatchCommentFetch(item_id)
    this.updateItemViews(item_id)
  }


  componentDidMount() {
    this.listPopularItems()
  }


  // API for Listing item details
  itemDetailsFetch = () => {
    console.log('laoding item detaols...');
    const { item } = this.props.location.state

    getItemDetailsAPI(item.id)
    .then(response => {
      if (response.data) {
        // console.log('response.data', response.data);
        this.setState({itemDetails: response.data})
        this.setState({fetchingItem: false, itemFetched: true})
      } else if (response.error) {
        this.setState({fetchingItem: false})
      }
    })
  }


  // List out popular items
  listPopularItems = () => {
    popularItemsListAPI()
    .then(response => {
      if (response.data) {
        this.setState({popularItems: response.data.results})
      } else if (response.error) {
        // log error
      }
    })
  }

  // Update the views of item
  updateItemViews = (item_id) => {
    itemViewsUpdateAPI(item_id)
    .then(response => {
      if (response.data) {
        // success
      } else if (response.error) {
        // log error
      }
    })
  }


  // Create new cart if no cart is present else update items to valid cart
  onAddToCart = () => {
    const { item } = this.props.location.state

    const { authentication: {
      userAuthenticated,
      token,
      user,
    }} = this.props

    if (userAuthenticated) {

      this.setState({loading: true})
      if (user.valid_cart) {
        const if_exist = user.valid_cart.cart_items.filter(cart_item => cart_item.item.id === item.id)

        if (if_exist.length > 0) {
          this.setState({failureMessage: "Already in Cart!"})
          this.failureMessageAlert()
        } else {

          const cart_item = {
            item_id: item.id,
            quantity: this.state.quantity,
            size: this.state.itemSize
          }

          let data = {cart_item: cart_item}
          shoppingCartUpdateAPI(data, user.valid_cart.id)
          .then(response => {
            if (response.data) {
              user.valid_cart = response.data
              localStorage.setItem('user', JSON.stringify(user))
              this.props.updateUserDetail(token, user)

              this.successMessageAlert()

            } else if (response.error) {
              this.failureMessageAlert()
            }
          })

        }

      } else {
        const data = {
          cart_item: {
            item_id: item.id,
            quantity: this.state.quantity,
            size: this.state.itemSize
          }
        }

        shoppingCartCreateAPI(data)
        .then(response => {
          if (response.data) {
            user.valid_cart = response.data
            localStorage.setItem('user', JSON.stringify(user))
            this.props.updateUserDetail(token, user)

            this.successMessageAlert()
            this.setState({loading: false})

          } else if (response.error) {
            this.failureMessageAlert()
            this.setState({loading: false})
          }
      })
    }
    } else {
      console.log('user is not authenticated, show login message');
      this.props.onLoginPress()
    }
  }

  // Displays loading screen for 1.5 second
  showingLoading = (messageAlert) => {
    setTimeout(() => {
      messageAlert()
    }, 1000);
  }

  // Displays success message for 1 seconds
  successMessageAlert = () => {
    this.setState({loading: false});
    this.setState({showSuccessMessage: true})
    setTimeout(() => {
      this.redirectToHome()
    }, 1000);
  }

  // Displays error message for 1 seconds
  failureMessageAlert = () => {
    this.setState({loading: false});
    this.setState({showFailureMessage: true})
    setTimeout(() => {
      this.setState({showFailureMessage: false})
    }, 1000);
  }

  redirectToHome = () => {
    this.setState({showSuccessMessage: false})
    this.props.history.push("/");
  }


  increaseQuantity = () => {
    const { quantity } = this.state
    this.setState({quantity: quantity > 8 ? 9 : quantity+1})
  }

  decreaseQuantity = () => {
    const { quantity } = this.state
    this.setState({quantity: quantity > 1 ? quantity-1 : 1})
  }


  // API for Create item review
  onReviewCreate = (message) => {
    const { authentication: {
      user,
    }} = this.props

    const { item } = this.props.location.state

    var { comments: {
      comments,
    }} = this.props

    commentCreateAPI(message, user.id, item.id)
    .then(response => {
      if (response.data) {
        comments.count += 1
        comments.results.push(response.data)
        this.props.onCommentUpdate(comments)
        this.setState({comment: ""})

      } else if (response.error) {
        // log errorr
      }
    })
  }


  // API for Rating Create
  handleItemRating = (rating) => {
    const { authentication: {
      user,
    }} = this.props

    const { item } = this.props.location.state
    console.log('user', user.id);
    console.log('item', item.id);
    ratingCreateAPI(rating, user.id, item.id)
    .then(response => {
      if (response.data) {
        console.log('response.data', response.data);
        this.setState({itemDetails: response.data})
      } else if (response.error) {
        // log errorr
      }
    })
  }


  handleReviewComment = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate', e.target.value);
      this.onReviewCreate(e.target.value)
    }
  }


  onRecommendedProductSelect = (item) => {
    this.props.location.state.item = item
  }

  formatDatetime = (datetime) => {
    let dt = new Date(datetime)
    let finalDT = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`
    return finalDT
  }

  formatTime = (datetime) => {
    let dt = new Date(datetime)
    let finalDT = `${dt.getHours()}:${dt.getMinutes()}`
    return finalDT
  }

  render() {
    const { comments: {
      commentFetched,
      commentFetching,
      comments,
    }} = this.props

    const { authentication: {
      userAuthenticated,
      user,
    }} = this.props

    const item = this.state.itemDetails
    const { showSuccessMessage, showFailureMessage, loading, quantity, popularItems, itemSize, itemFetched, fetchingItem } = this.state

    let containerStyle = {
      padding: "0px 30px 0px 30px",
      backgroundColor: '#EBEDEF',
      display: 'flex',
      flexDirection: "column"
    }

    let rowstyle = {
      backgroundColor: 'white',
      margin: '10px',
      padding: '20px',
      borderRadius: '5px'
    }

    let ratingRowStyle = {
      backgroundColor: 'white',
      margin: "10px 0px 10px 10px",
      padding: '20px',
      borderRadius: '5px'
    }

    let topSellerRowStyle = {
      backgroundColor: 'white',
      margin: "10px 10px 10px 0px",
      padding: '20px',
      borderRadius: '5px'
    }

    // console.log('item at item detail page ===> ', item);
    // console.log('user at user detail page ===> ', user);

    return (
      <div style={containerStyle}>
        {
          itemFetched ?
          <Row style={rowstyle} className="custom-shadow">
            <Col sm={5} className="d-flex align-items-center justify-content-center">
              <img
                style={{marginRight: "10px", borderRadius: '5px'}}
                src={item.item_image}
                width="100%"
                height="auto"
                className="d-inline-block align-top"
                alt="Item Image"
                />
            </Col>
            <Col sm={4}>
              <h5>{item.name}</h5>
              <div style={{display: 'flex'}}>
                <Rating rating={parseInt(item.ratings_value.average_rating)} />
                <span style={{fontSize: '14px', color: '#707B7C', marginLeft: '10px'}}>{item.ratings_value.total_ratings} Rating(s) | {item.reviews_count} Review(s)</span>
              </div>
              <hr/ >
                <span style={{color: "orange", paddingTop: '0px', marginRight: '20px', fontSize: '35px', fontWeight: 'bold'}}>${ itemSize === "MEDIUM" ? item.ms_price : item.ls_price}</span>
                {
                  item.discount ?
                  <span style={{fontSize: '14px', color: '#707B7C', marginRight: '10px', marginTop: '0px'}}>
                    {
                      itemSize === "MEDIUM" ?
                      <del>$ {(item.ms_price + ((item.discount.discount_percent / 100) * item.ms_price)).toFixed(1)}</del>
                      :
                      <del>$ {(item.ls_price + ((item.discount.discount_percent / 100) * item.ls_price)).toFixed(1)}</del>
                    }
                  </span>
                  : null
                }

                {
                  item.discount ?
                  item.discount.code === 'SPECIAL' ?
                  <Badge variant="secondary">{item.discount.name}</Badge>
                  : item.discount.code === 'LOYALTY' ?
                  <Badge variant="dark">{item.discount.name}</Badge>
                  : item.discount.code === 'HOLIDAY' ?
                  <Badge variant="light">{item.discount.name}</Badge>
                  : item.discount.code === 'STAYHOME' ?
                  <Badge variant="warning">{item.discount.name}</Badge>
                  : null
                  : null
                }

                <hr/ >
                  <Row>
                    <Col sm={2}>
                      <h6 className="title">Size</h6>
                    </Col>
                    <Col sm={10}>
                      <Form inline style={{justifyContent: 'space-around'}}>
                        <Form.Check
                          custom
                          type="radio"
                          id="medium_size"
                          name="size_radio"
                          label="Medium"
                          checked={this.state.itemSize === "MEDIUM" ? true : false}
                          onChange={() => this.setState({itemSize: 'MEDIUM'})}
                          />
                        <Form.Check
                          custom
                          type="radio"
                          id="large_size"
                          name="size_radio"
                          label="Large"
                          checked={this.state.itemSize === "LARGE" ? true : false}
                          onChange={() => this.setState({itemSize: 'LARGE'})}
                          />
                      </Form>
                    </Col>
                  </Row>
                  <Row style={{marginTop: '20px'}}>
                    <Col sm={3}>
                      <h6 className="title">Quantity</h6>
                    </Col>
                    <Col sm={9}>
                      <QuantityCalculator quantity={quantity} increaseQuantity={this.increaseQuantity} decreaseQuantity={this.decreaseQuantity} />
                    </Col>
                  </Row>

                  <Row style={{marginTop: '20px'}}>
                    <Col md={6}>
                      <Button onClick={() => this.props.history.push('/')} variant="secondary" block>Continue Shopping</Button>
                    </Col>
                    <Col md={6}>
                      <Button onClick={this.onAddToCart} variant="primary" block>Add to Cart</Button>
                    </Col>
                  </Row>


                </Col>
                <Col sm={3}>
                  <h6 className="title">Delivery Options</h6>
                  <p><i className="fa fa-map-marker" style={{fontSize: '20px', margin: '5px'}}></i> With in 20 KM of city</p>
                  <hr/ >

                    <h6 className="title">Return Policy</h6>
                    <p><i className="fa fa-exclamation-circle" style={{fontSize: '20px', margin: '5px'}}></i>No return of delivered goods</p>
                    <hr/ >
                    </Col>
                  </Row>
          : fetchingItem ?
          <Row style={rowstyle} className="custom-shadow">
            <Col className="d-flex align-items-center justify-content-center" style={{minHeight: '500px'}}>
              <Spinner />
            </Col>
          </Row>
          : null
        }

        <Row>
          <Col sm={8}>
            {
              itemFetched ?
              <Row style={ratingRowStyle} className="custom-shadow">
                <Col sm={6}>
                  <h6>Rate this item</h6>
                  <div  onClick={() => this.handleItemRating(5)}>
                    <Rating rating={5} size={25} cursor="pointer" />
                  </div>
                  <div onClick={() => this.handleItemRating(4)}>
                    <Rating rating={4} size={25} cursor="pointer" />
                  </div>
                  <div onClick={() => this.handleItemRating(3)}>
                    <Rating rating={3} size={25} cursor="pointer" />
                  </div>
                  <div onClick={() => this.handleItemRating(2)}>
                    <Rating rating={2} size={25} cursor="pointer" />
                  </div>
                  <div onClick={() => this.handleItemRating(1)}>
                    <Rating rating={1} size={25} cursor="pointer" />
                  </div>
                </Col>
                <Col sm={3}>
                  <h6>Total Rating</h6>
                  <h3>{item.ratings_value.total_ratings}</h3>
                </Col>
                <Col sm={3}>
                  <h6>Average Rating</h6>
                  <h3>{parseInt(item.ratings_value.average_rating)}</h3>
                </Col>
              </Row>
              : null
            }
            <Row style={ratingRowStyle} className="custom-shadow">
                {
                  commentFetched ?
                  <Col sm={12}>
                    <div>
                      <h6>{comments.count} user Review(s) </h6>
                      <hr />
                      {
                        comments.results.map((comment, index) => (
                          <Row key={index} style={{marginBottom: '10px'}}>
                            <Col sm={2} style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                              {
                                comment.user.user_image ?
                                <img
                                  style={{borderRadius: '100px', alignSelf: 'center'}}
                                  src={comment.user.user_image}
                                  width="50px"
                                  height="50px"
                                  className="d-inline-block align-top"
                                  alt="User logo"
                                  />
                                :
                                <i className="fa fa-user fa-3x"></i>

                              }
                            </Col>
                            <Col sm={9} style={{backgroundColor: '#EFEFEF', borderRadius: '10px', padding: '10px'}}>
                              <span style={{fontWeight: 'bold'}}>{comment.user.first_name} {comment.user.last_name} <span style={{fontSize: '12px', color: '#707B7C', marginLeft: '7px'}}>{this.formatDatetime(comment.created_at)} | {this.formatTime(comment.created_at)}</span></span><br/>
                              <span>{comment.message}</span>
                            </Col>
                          </Row>
                      ))
                      }

                      {
                        userAuthenticated ?

                        <Row style={{marginTop: '25px', marginBottom: '20px'}}>
                          <Col sm={2} style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            {
                              user.user_image ?
                              <img
                                style={{ borderRadius: '100px', alignSelf: 'center'}}
                                src={user.user_image}
                                width="40px"
                                height="40px"
                                className="d-inline-block align-top"
                                alt="User logo"
                                />
                              :
                              <i className="fa fa-user fa-2x"></i>
                            }
                          </Col>

                          <Col sm={9} style={{padding: '0px', marginTop: '5px'}}>
                            <Form.Control
                              style={{backgroundColor: '#EFEFEF', borderRadius: '10px', padding: '10px', margin: '0px'}}
                              type="text"
                              onKeyDown={this.handleReviewComment}
                              value={this.state.comment}
                              onChange={(e) => this.setState({comment: e.target.value})}
                              placeholder="Write your review..." />
                          </Col>
                        </Row>
                        :
                        <Col sm={12} className="d-flex align-items-center justify-content-center" style={{minHeight: '120px'}}>
                          <h5>Login to Review this item!</h5>
                        </Col>
                      }
                    </div>
                  </Col>
                  : commentFetching ?
                  <Col sm={12} className="d-flex align-items-center justify-content-center" style={{minHeight: '150px'}}>
                    <Spinner />
                  </Col>
                  : null
                }


            </Row>
          </Col>
          <Col sm={4}>
            <Card style={{marginRight: '10px', marginop: '10px'}}>
              <Card.Header><h5>Recommended Items</h5></Card.Header>
            </Card>
            {
              popularItems.map((popularItem, index) => (
                <Row key={index} style={topSellerRowStyle} className="custom-shadow">
                  <Col sm={12}>
                    <Row>
                      <Col sm={7}>
                        <h6>{popularItem.name}</h6>
                        <img
                          style={{ alignSelf: 'center', borderRadius: '10px'}}
                          src={popularItem.item_image}
                          width="80%"
                          height="auto"
                          className="d-inline-block align-top"
                          alt="Item Image"
                          />
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <h2>${popularItem.ls_price}</h2>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))
            }
          </Col>
        </Row>

        <FullScreenLoading show={loading} message="Adding Item..." />
        <Message
          successMessage={this.state.successMessage}
          failureMessage={this.state.failureMessage}
          showSuccessMessage={showSuccessMessage}
          showFailureMessage={showFailureMessage} />

      </div>
    );
  }
}



const mapStateToProps  = state => ({
  authentication: state.authentication,
  comments: state.comments,
})

const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
  dispatchCommentFetch: (item_id) => commentFetch(item_id),
  onCommentUpdate: (comments) => commentFetchSuccess(comments),
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
