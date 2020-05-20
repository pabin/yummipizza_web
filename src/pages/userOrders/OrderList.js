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


import Spinner from '../../components/Spinner'
import FilterForm from '../../components/FilterForm'
import ServersidePagination from '../../components/Pagination'
import { orderListFetch } from '../../store/actions/OrderListActions';


// List out all the items in cart and proceed to address fill and confirm order
class OrderList extends React.Component {
  constructor(props) {
    super(props)

    var params = new URLSearchParams(this.props.location.search);
    var page = parseInt(params.get('page'))


    this.state = {
      currentPage: (page ? page : 1),
      showDetailModal: false,
      selectedOrder: "",
      filters: [
        {name: "Date", id: 'DATE', options: [
          {type: "checkbox", id: "THIS_WEEK", label: "This Week", selected: false},
          {type: "checkbox", id: "LAST_WEEK", label: "Last Week", selected: false},
          {type: "checkbox", id: "ALL", label: "All Order", selected: false},
        ]},
        {name: "Total Price", id: 'PRICE',  options: [
          {type: "checkbox", id: "PRICE1", label: "$1 - $50", selected: false},
          {type: "checkbox", id: "PRICE2", label: "$51 - $100", selected: false},
          {type: "checkbox", id: "PRICE3", label: "$101 - $200", selected: false},
          {type: "checkbox", id: "PRICE4", label: "$201 and above", selected: false},
        ]},
        {name: "Status", id: 'STATUS', options: [
          {type: "checkbox", id: "DELIVERED", label: "Delivered", selected: false},
          {type: "checkbox", id: "PENDING", label: "Pending", selected: false},
          {type: "checkbox", id: "CANCELLED", label: "Cancelled", selected: false},
        ]},
      ],
    }

    if (page) {
      this.props.dispatchOrderListFetch({filter: true, data: {page: page}})
    } else {
      this.props.dispatchOrderListFetch({list: true})
    }

    if (!this.props.userAuthenticated) {
      this.props.history.push("/")
    }
  }


  onItemFilter = (filterOption, value) => {
    const { filters } = this.state
    filters.map(filter => {
      filter.options.map(option => {
        if (filterOption.id === option.id) option.selected = value;
      })
    })
    this.setState({filters})

    let dates = []
    let prices = []
    let status = []

    // let { types, prices, reviews, sort_by } = this.state
    filters.map(filter => {
      filter.options.map(option => {
        if (filter.id == "DATE") {
          if (option.selected) {
            console.log('yes date is selected', option.id, option.selected);
            dates.push(option.id)
          } else dates.pop(option.id);
        } else if (filter.id == "PRICE") {
          if (option.selected) {
            console.log('yes price is selected', option.id, option.selected);
            prices.push(option.id)
          } else prices.pop(option.id);
        } else if (filter.id == "STATUS") {
          if (option.selected) {
            console.log('yes status is selected', option.id, option.selected);
            status.push(option.id)
          } else status.pop(option.id);
        }
      })
    })

    this.setState({dates: dates, prices: prices, status: status})

    let data = {
      dates: dates,
      prices: prices,
      status: status,
    }
    console.log('data', data);
    this.props.dispatchOrderListFetch({filter: true, data: data})
  }


  redirectToHome = () => {
    this.setState({showSuccessMessage: false})
    this.props.history.push("/");
  }

  handleDetailModalShow = (order) => {
    this.setState({showDetailModal: true, selectedOrder: order})
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


  handlePagination = (page) => {
    this.setState({currentPage: page})
    const { dates, prices, status } = this.state
    let data = {
      dates: dates,
      prices: prices,
      status: status,
      page: page
    }

    this.props.history.push(`/orders/?page=${page}`);
    this.props.dispatchOrderListFetch({filter: true, data: data})
  }


  render() {
    const { orderList: {
      orderListFetched,
      orderListFetching,
      orderList,
      errorMessage,
    }} = this.props

    const { filters, showDetailModal, selectedOrder } = this.state

    let active = 2;
    let items = [];
    for (let number = 1; number <= orderList.count/10; number++) {
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
            <FilterForm onItemFilter={this.onItemFilter} filters={filters} />
          </Col>

          {
            orderListFetched ?
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}} className="custom-shadow">
              <p style={{padding: '10px', paddingBottom: '0px'}}>{orderList.results.length} Orders on this page</p>

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
                    orderList.results.length > 0 ?
                    orderList.results.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{this.formatDatetime(order.ordered_at)} <Badge variant="dark">{this.formatTime(order.ordered_at)}</Badge></td>
                        <td>{order.delivery_address.name}</td>
                        <td>{order.contact_detail.mobile}</td>
                        <td>{order.order_items.length}</td>
                        {
                          order.status === "CANCELLED" ?
                          <td>${(order.total_price - 10).toFixed(2)}</td>
                          :
                          <td>${(order.total_price).toFixed(2)}</td>
                        }
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
                    :
                    <tr>
                      <td colspan="7">
                        <h5 align="center" style={{paddingTop: '100px'}}>No orders found!</h5>
                      </td>
                    </tr>
                  }
                </tbody>
              </Table>

            </Col>
            : orderListFetching ?
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}} className="d-flex align-items-center justify-content-center custom-shadow">
              <Spinner />
            </Col>
            :
            <Col sm={9} style={{backgroundColor: 'white', borderRadius: '5px', minHeight: '400px'}} className="d-flex align-items-center justify-content-center custom-shadow">
              <p>{errorMessage.toString()}</p>
            </Col>
          }

          <Col sm={12} className="d-flex align-items-end justify-content-end">
            <ServersidePagination
              totalItems={orderList.count}
              itemPerPage={10}
              currentPage={this.state.currentPage}
              handlePagination={this.handlePagination}
              />
          </Col>

          {
            orderListFetched && orderList.results.length <= 0 ?
            <Col sm={12} className="cart-item d-flex align-items-center justify-content-center">
              <h5>No orders found!</h5>
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
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {
                  showDetailModal ?
                  selectedOrder.order_items.map((item, index) => (
                    <tr key={index}>
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
                        {
                          item.size === "LARGE" ?
                          <td>${item.item.ls_price.toFixed(2)}</td>
                          :
                          <td>${item.item.ms_price.toFixed(2)}</td>
                        }

                        {
                          item.size === "LARGE" ?
                          <td>${(item.item.ls_price * item.quantity).toFixed(2)}</td>
                          :
                          <td>${(item.item.ms_price * item.quantity).toFixed(2)}</td>
                        }

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
                  <td colSpan="3"></td>
                  <th>Total</th>
                  {
                    selectedOrder.status === "CANCELLED" ?
                    <th>${showDetailModal ? (selectedOrder.total_price - 10).toFixed(2) : null} </th>
                    :
                    <th>${showDetailModal ? (selectedOrder.total_price - 10).toFixed(2) : null} {"+ $10"}</th>
                  }
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
  dispatchOrderListFetch: (data) => orderListFetch(data),
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
