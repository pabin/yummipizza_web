import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';

import './ItemDetail.css'
import QuantityCalculator from '../../components/QuantityCalculator'
import Rating from '../../components/Rating'

import Message from '../../components/Message'
import FullScreenLoading from '../../components/FullScreenLoading'

import { shoppingCartCreateAPI, shoppingCartUpdateAPI } from '../../api/CartAPIs';
import { userAuthenticationSuccess } from '../../store/actions/AuthenticationActions';


// Item detail page, displays all the details of a particular item
// User can rate a item and give reviews from this page
class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      showSuccessMessage: false,
      showFailureMessage: false,
    }
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
        console.log('yes have valid cart...');

        let items = []
        user.valid_cart.items_list.map(cartItem => {
          items.push(cartItem.id)
        })
        items.push(item.id)

        let data = {items: items}

        shoppingCartUpdateAPI(data, user.valid_cart.id)
        .then(response => {
          if (response.data) {
            user.valid_cart = response.data
            this.props.updateUserDetail(token, user)
            this.showingLoading(this.successMessageAlert)
          } else if (response.error) {
            this.showingLoading(this.failureMessageAlert)
          }
        })
      } else {
        console.log('you dont have cart creating new one...');
        const data = {items: [item.id]}

        shoppingCartCreateAPI(data)
        .then(response => {
          if (response.data) {
            user.valid_cart = response.data
            this.props.updateUserDetail(token, user)
            this.showingLoading(this.successMessageAlert)

          } else if (response.error) {
            this.showingLoading(this.failureMessageAlert)
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
    }, 1500);
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


  render() {
    const { item } = this.props.location.state
    const { showSuccessMessage, showFailureMessage, loading } = this.state

    let containerStyle = {
      padding: "0px 30px 0px 30px",
      backgroundColor: '#DFDFDF',
      display: 'flex',
      flexDirection: "column"
    }

    let rowstyle = {
      backgroundColor: 'white',
      margin: '10px',
      padding: '20px',
    }

    let ratingRowStyle = {
      backgroundColor: 'white',
      margin: "10px 0px 10px 10px",
      padding: '20px',
    }

    let topSellerRowStyle = {
      backgroundColor: 'white',
      margin: "10px 10px 10px 0px",
      padding: '20px',
    }


    return (
      <div style={containerStyle}>
        <Row style={rowstyle}>
          <Col sm={5} className="d-flex align-items-center justify-content-center">
            <img
              style={{marginRight: "10px", borderRadius: '5px'}}
              src={item.item_image}
              width="100%"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Col>
          <Col sm={4}>
            <h5>{item.name}</h5>

            <Rating rating={4} />

            <hr/ >
            <h4 style={{color: "orange"}}>$ {item.ls_price}</h4>
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
                    />
                  <Form.Check
                    custom
                    type="radio"
                    id="large_size"
                    name="size_radio"
                    label="Large"
                    />
                </Form>
              </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
              <Col sm={3}>
                <h6 className="title">Quantity</h6>
              </Col>
              <Col sm={9}>
                <QuantityCalculator item={item} />
              </Col>
            </Row>

            <Row style={{marginTop: '20px'}}>
              <Col md={6}>
                <Button onClick={() => this.props.history.push('/')} variant="primary" block>Continue Shopping</Button>
              </Col>
              <Col md={6}>
                <Button onClick={this.onAddToCart} variant="primary" block>Add to Cart</Button>
              </Col>
            </Row>


          </Col>
          <Col sm={3}>
            <h6 className="title">Delivery Options</h6>
            <p><i class="fa fa-map-marker" style={{fontSize: '20px', margin: '5px'}}></i> With in 20 KM of city</p>
            <hr/ >

            <h6 className="title">Returns</h6>
            <p><i class="fa fa-times-circle-o" style={{fontSize: '20px', margin: '5px'}}></i>No return of delivered goods</p>
            <hr/ >
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <Row style={ratingRowStyle}>
              <Col sm={12}>
                <h4>Reviews and Ratings</h4>
                <p>Rating 3</p>
                <p>Rating 4</p>
                <p>Rating 5</p>
              </Col>
            </Row>
            <Row style={ratingRowStyle}>
              <Col sm={12}>
                <h4>Reviews and Ratings 2</h4>
                <p>Rating 3</p>
                <p>Rating 4</p>
                <p>Rating 5</p>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row style={topSellerRowStyle}>
              <Col sm={12}>
                <h5>Best Seller</h5>
                <p>{item.name}</p>
                <p>$ {item.ls_price}</p>
              </Col>
            </Row>
            <Row style={topSellerRowStyle}>
              <Col sm={12}>
                <h5>Best Seller 2</h5>
                <p>{item.name}</p>
                <p>$ {item.ls_price}</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <FullScreenLoading show={loading} message="Adding Item..." />
        <Message
          successMessage="Added Successfully"
          showSuccessMessage={showSuccessMessage}
          showFailureMessage={showFailureMessage} />

      </div>
    );
  }
}



const mapStateToProps  = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  updateUserDetail: (token, user) => userAuthenticationSuccess(token, user),
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)
