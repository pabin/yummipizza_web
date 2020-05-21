import React from 'react';
import { connect } from 'react-redux';

import {
  Form,
  Row,
  Col,
} from 'react-bootstrap';

import './Home.css';

import { itemListFetch } from '../../store/actions/ItemListActions';

import ItemCard from '../../components/ItemCard'
import Spinner from '../../components/Spinner'
import ServersidePagination from '../../components/Pagination'
import FilterForm from '../../components/FilterForm'



// Home page for rendering home screen of the site, list the available items
// No authentication required, user can perform different item filter actions
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    var params = new URLSearchParams(this.props.location.search);
    var page = parseInt(params.get('page'))

    this.state = {
      currentPage: (page ? page : 1),
      is_open: true,
      sort_by: "",
      filters: [
        {name: "Type", id: 'TYPE', options: [
          {type: "checkbox", id: "VEG", label: "Veg", selected: false},
          {type: "checkbox", id: "NON_VEG", label: "Non-Veg", selected: false},
        ]},
        {name: "Price", id: 'PRICE',  options: [
          {type: "checkbox", id: "PRICE1", label: "$1 - $10", selected: false},
          {type: "checkbox", id: "PRICE2", label: "$11 - $20", selected: false},
          {type: "checkbox", id: "PRICE3", label: "$21 - $30", selected: false},
          {type: "checkbox", id: "PRICE4", label: "$31 - $40", selected: false},
          {type: "checkbox", id: "PRICE5", label: "$41 and above", selected: false},
        ]},
        {name: "Rating and Reviews", id: 'REVIEW', options: [
          {type: "checkbox", id: "REVIEWS", label: "Have Reviews", selected: false},
          {type: "checkbox", id: "RATINGS", label: "Have Ratings", selected: false},
        ]},
      ],
    }

    if (page) {
      this.props.dispatchItemListFetch({filter: true, data: {page: page}})
    } else {
      this.props.dispatchItemListFetch({list: true})
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

    let types = []
    let prices = []
    let reviews = []

    let { sort_by } = this.state
    filters.map(filter => {
      filter.options.map(option => {
        if (filter.id == "TYPE") {
          if (option.selected) {
            types.push(option.id)
          } else {
            types = types.filter(typ => typ !== option.id)
          }
        } else if (filter.id == "PRICE") {
          if (option.selected) {
            prices.push(option.id)
          } else {
            prices = prices.filter(price => price !== option.id)
          }
        } else if (filter.id == "REVIEW") {
          if (option.selected) {
            reviews.push(option.id)
          } else {
            reviews = reviews.filter(review => review !== option.id)
          }
        }
      })
    })

    this.setState({types: types, prices: prices, reviews: reviews})

    let data = {
      types: types,
      prices: prices,
      reviews: reviews,
      sort_by: sort_by,
    }
    console.log('data', data);
    this.props.dispatchItemListFetch({filter: true, data: data})
  }

  onItemSorting = (value) => {
    console.log('onItemSorting...');
    const { types, prices, reviews } = this.state
    if (value) this.props.dispatchItemListFetch({filter: true, data: {types: types, prices:prices, reviews: reviews, sort_by: value}})
  }

  handlePagination = (page) => {
    this.setState({currentPage: page})
    const { types, prices, reviews, sort_by } = this.state
    const data = {
        types: types,
        prices:prices,
        reviews: reviews,
        sort_by: sort_by,
        page: page
      }
    this.props.history.push(`/?page=${page}`);
    this.props.dispatchItemListFetch({filter: true, data: data})
  }


  render() {
    const { itemList: {
      itemListFetched,
      itemListFetching,
      itemList,
      errorMessage,
    }} = this.props
    const { filters } = this.state

    return (
      <Row className="home-row">
        <Col sm={3}>
          <h6 align="center">Item Filters</h6>
            <FilterForm filters={filters} onItemFilter={this.onItemFilter} />
        </Col>

        {
          itemListFetched ?
          <Col sm={9}>
            <h6>Most Popular Pizzas</h6>
            <Row>
              <Col sm={4}>
                <p>{itemList.results.length} Items on this page</p>
              </Col>

              <Col sm={8} className="d-flex justify-content-end">
                <Form inline >
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Sort By &nbsp;&nbsp;</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.sort_by}
                      onChange={(e) => {
                          this.setState({sort_by:e.target.value})
                          this.onItemSorting(e.target.value)
                        }}>
                      <option value="">Sorty By</option>
                      <option value="POPULARITY">Popularity</option>
                      <option value="LOW_TO_HIGH">Price low to high</option>
                      <option value="HIGHT_TO_LOW">Price high to low</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <hr />

            <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {
                itemList.results.map((item, index) => (
                  <ItemCard
                    key={index}
                    item={item}
                    onLoginPress={this.props.onLoginPress}
                    />
                ))
              }
            </div>

            <ServersidePagination
              totalItems={itemList.count}
              itemPerPage={16}
              currentPage={this.state.currentPage}
              handlePagination={this.handlePagination}
               />

          </Col>
          : itemListFetching ?
          <Col sm={9} className="d-flex align-items-center justify-content-center">
            <Spinner />
          </Col>
          :
          <Col sm={9} className="d-flex align-items-center justify-content-center">
             <p>{errorMessage.toString()}</p>
          </Col>
        }
      </Row>
    );
  }
}

const mapStateToProps  = state => ({
  itemList: state.itemList,
})

const mapDispatchToProps = {
  dispatchItemListFetch: (data) => itemListFetch(data),
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
