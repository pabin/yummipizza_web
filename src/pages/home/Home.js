import React from 'react';
import { connect } from 'react-redux';

import {
  Form,
  Row,
  Col,
  Pagination,
} from 'react-bootstrap';

import './Home.css';

import { itemListFetch } from '../../store/actions/ItemListActions';

import ItemCard from '../../components/ItemCard'
import Spinner from '../../components/Spinner'
import FilterForm from '../../components/FilterForm'



// Home page for rendering home screen of the site, list the available items
// No authentication required, user can perform different item filter actions
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
      filters: [
        {name: "Type", options: [
          {type: "checkbox", id: "VEG", label: "Veg", selected: false},
          {type: "checkbox", id: "NON_VEG", label: "Non-Veg", selected: false},
        ]},
        {name: "Price", options: [
          {type: "checkbox", id: "PRICE1", label: "$1 - $10", selected: false},
          {type: "checkbox", id: "PRICE2", label: "$11 - $20", selected: false},
          {type: "checkbox", id: "PRICE3", label: "$21 - $30", selected: false},
          {type: "checkbox", id: "PRICE4", label: "$31 - $40", selected: false},
          {type: "checkbox", id: "PRICE5", label: "$41 and above", selected: false},
        ]},
        {name: "Rating", options: [
          {type: "checkbox", id: "RATING", label: "Above 3", selected: false},
        ]},
      ],
    }

    this.props.dispatchItemListFetch()
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
    filters.map(filter => {
      filter.options.map(option => {
        if (filter.name === "Type" && option.selected) types.push(option.id)
        if (filter.name === "Price" && option.selected) prices.push(option.id)
      })
    })

    let data = {
      types: types,
      prices: prices,
    }

    this.props.dispatchItemListFetch(data)

  }


  render() {
    const { itemList: {
      itemListFetched,
      itemListFetching,
      itemList,
      errorMessage,
    }} = this.props
    const { filters } = this.state

    let active = 2;
    let items = [];
    for (let number = 1; number <= itemList.count/10; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

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
                    <Form.Control as="select">
                      <option>Popularity</option>
                      <option>Price low to high</option>
                      <option>Price high to low</option>
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

            <div className="d-flex align-items-end justify-content-end">
              <Pagination>{items}</Pagination>
            </div>

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
