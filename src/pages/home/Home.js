import React from 'react';
import { connect } from 'react-redux';

import {
  Form,
  Row,
  Col,
  Card,
  Pagination,
} from 'react-bootstrap';

import './Home.css';

import { itemListFetch } from '../../store/actions/ItemListActions';
import { userAuthentication } from '../../store/actions/AuthenticationActions';

import ItemCard from '../../components/ItemCard'


class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
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

    this.props.dispatchItemListFetch()
    // this.props.dispatchUserAuthentication("ilovepizza", "ilovepizza")
  }

  render() {
    const { itemList: {
      itemListFetched,
      itemListFetching,
      itemList,
      // errorMessage,
    }} = this.props

    const { typeFilters, priceFilters, ratingFilters } = this.state

    const filters = [
      {name: "Type", options: typeFilters},
      {name: "Price", options: priceFilters},
      {name: "Rating", options: ratingFilters},
    ]

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
          <h6 align="center">Product Filters</h6>
          {
            filters.map((filter, index) => (
              <Card key={index} border="light" style={{marginBottom: "15px"}}>
                <Card.Header>{filter.name}</Card.Header>
                <Card.Body>
                  <Form>
                    {
                      filter.options.map((filterOption, indx) => (
                        <Form.Check
                          key={indx}
                          custom
                          type={filterOption.type}
                          id={filterOption.id}
                          label={filterOption.label}
                        />
                    ))
                    }
                  </Form>
                </Card.Body>
              </Card>
            ))
          }
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
                    <Form.Label>Sort By : </Form.Label>
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
            Loading...
          </Col>
          : null
        }
      </Row>
    );
  }
}

const mapStateToProps  = state => ({
  itemList: state.itemList
})

const mapDispatchToProps = {
  dispatchItemListFetch: () => itemListFetch(),
  dispatchUserAuthentication: (username, password) => userAuthentication(username, password),
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
