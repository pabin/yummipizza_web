import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Button,
  Modal,
  Table,
  Badge,
  Card,
  Pagination,
} from 'react-bootstrap';

// import './OrderList.css';

import Spinner from '../../components/Spinner'
import FilterForm from '../../components/FilterForm'
import { orderListFetch } from '../../store/actions/OrderListActions';


// List out all the items in cart and proceed to address fill and confirm order
class OrderList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetailModal: false,
      selectedOrder: "",
      typeFilters: [
        {type: "checkbox", id: "veg-checkbox", label: "Veg"},
        {type: "checkbox", id: "non-veg-checkbox", label: "Non-Veg"},
      ],
      priceFilters: [
        {type: "checkbox", id: "0-10-checkbox", label: "$0 - $10"},
        {type: "checkbox", id: "11-20-checkbox", label: "$11 - $20"},
        {type: "checkbox", id: "21-30-checkbox", label: "$21 - $30"},
        {type: "checkbox", id: "31-100-checkbox", label: "$31 - $100"},
      ],
      ratingFilters: [
        {type: "checkbox", id: "above-3-checkbox", label: "Above 3"},
        {type: "checkbox", id: "below-3-checkbox", label: "Below 3"},
      ],
    }

    this.props.dispatchOrderListFetch()
  }

  redirectToHome = () => {
    this.setState({showSuccessMessage: false})
    this.props.history.push("/");
  }

  handleDetailModalShow = (order) => {
    this.setState({showDetailModal: true, selectedOrder: order})
  }

  render() {
    const { orderList: {
      orderListFetched,
      orderListFetching,
      orderList,
      errorMessage,
    }} = this.props

    const { typeFilters, priceFilters, ratingFilters, showDetailModal, selectedOrder } = this.state

    const filters = [
      {name: "Type", options: typeFilters},
      {name: "Price", options: priceFilters},
      {name: "Rating", options: ratingFilters},
    ]

    let active = 2;
    let items = [];
    for (let number = 1; number <= orderList.count; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <div className="cart-container">
        <Row className="cart-row">

          <Col sm={3}>
            <Card style={{marginBottom: '5px'}}>
              <Card.Header><h6>Order Filters</h6></Card.Header>
            </Card>
            <FilterForm filters={filters} />
          </Col>

          {
            orderListFetched ?
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Items</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderList.results.map((order, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{ new Date(order.ordered_at).toDateString() }</td>
                        <td>{order.delivery_address.name}</td>
                        <td>{order.contact_detail.mobile}</td>
                        <td>{order.order_items.length}</td>
                        <td>${order.total_price.toFixed(2)}</td>
                        <td>
                          {
                            order.status === "DELIVERED" ?
                            <Badge variant="success">{order.status}</Badge>
                            : order.status === "CANCELLED" ?
                            <Badge variant="danger">{order.status}</Badge>
                            :
                            <Badge variant="info">{order.status}</Badge>
                          }
                        </td>
                        <td><Button variant="default" onClick={() => this.handleDetailModalShow(order)}>View</Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
            : orderListFetching ?
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}} className="d-flex align-items-center justify-content-center">
              <Spinner />
            </Col>
            :
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}} className="d-flex align-items-center justify-content-center">
              <p>{errorMessage.toString()}</p>
            </Col>            
          }

          <Col sm={9} className="d-flex align-items-end justify-content-end">
            <div style={{marginTop: '20px'}}>
              <Pagination>{items}</Pagination>
            </div>
          </Col>

          {
            orderListFetched && orderList.results.length <= 0 ?
            <Col sm={12} className="cart-item" className="d-flex align-items-center justify-content-center">
              <h5>No orders found!</h5>
              <p>
                Go Shpping
              </p>
            </Col>
            : null
          }
        </Row>


        <Modal
          size="lg"
          show={showDetailModal}
          onHide={() => this.setState({showDetailModal: false})}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <h5>Order Details</h5>
          </Modal.Header>
          <Modal.Body>

            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {
                  showDetailModal ?
                  selectedOrder.order_items.map((item, index) => (
                    <tr>
                      <td style={{padding: '5px', width: "120px"}}>
                        <img
                          style={{borderRadius: '5px'}}
                          src={item.item.item_image}
                          width="100%"
                          height="auto"
                          className="d-inline-block align-top"
                          alt="React Bootstrap logo"
                        />
                      </td>
                      <td>{item.item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.item.ls_price.toFixed(2)}</td>
                      <td>
                        {
                          item.size === "LARGE" ?
                          <Badge variant="success">{item.size}</Badge>
                          :
                          <Badge variant="info">{item.size}</Badge>
                        }
                      </td>
                    </tr>
                  ))
                : null
                }
                <tr>
                  <td colspan="2"></td>
                  <th>Total</th>
                  <th>${showDetailModal ? (selectedOrder.total_price - 10).toFixed(2) : null} {"+ $10"}</th>
                  <td></td>
                </tr>
              </tbody>
            </Table>

        </Modal.Body>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps  = state => ({
  orderList: state.orderList,
})

const mapDispatchToProps = {
  dispatchOrderListFetch: () => orderListFetch(),
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
