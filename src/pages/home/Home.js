import React from 'react';
import { connect } from 'react-redux';

import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import logo from '../../logo.svg';
import './Home.css';

import { itemListFetch } from '../../store/actions/ItemListActions';
import { userAuthentication } from '../../store/actions/AuthenticationActions';

import ItemCard from '../../components/ItemCard'


class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
    }

    this.props.dispatchItemListFetch()
    // this.props.dispatchUserAuthentication("ilovepizza", "ilovepizza")
  }

  render() {
    const { itemList: {
      itemListFetched,
      itemListFetching,
      itemList,
      errorMessage,
    }} = this.props

    return (
      <Row className="home-row">
        <Col sm={3}>
          <h5 align="center">Product Filters</h5>
          <div className="filter-container">
            <h6>Type</h6>
            <Form>
              <Form.Check
                custom
                type="checkbox"
                id="veg-checkbox"
                label="Veg"
              />
              <Form.Check
                custom
                type="checkbox"
                id="non-veg-checkbox"
                label="Non-Veg"
              />
            </Form>
          </div>

          <div className="filter-container">
            <h6>Price</h6>
            <Form>
              <Form.Check
                custom
                type="checkbox"
                label="$0 - $10"
                id="0-10-checkbox"
              />
              <Form.Check
                custom
                type="checkbox"
                label="$11 - $20"
                id="11-20-checkbox"
              />
              <Form.Check
                custom
                type="checkbox"
                label="$21 - $30"
                id="21-30-checkbox"
              />
              <Form.Check
                custom
                type="checkbox"
                id="30-100-checkbox"
                label="$30- $100"
              />
            </Form>
          </div>

          <div className="filter-container">
            <h6>Rating</h6>
            <Form>
              <Form.Check
                custom
                type="checkbox"
                id="veg-checkbox"
                label="Veg"
              />
              <Form.Check
                custom
                type="checkbox"
                id="non-veg-checkbox"
                label="Non-Veg"
              />
            </Form>
          </div>

        </Col>
        {
          itemListFetched ?
          <Col sm={9} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              itemList.results.map((item, index) => (
                <ItemCard
                  key={index}
                  name={item.name}
                  image={item.item_image}
                  price={item.ls_price}
                />
              ))
            }
          </Col>
          : itemListFetching ?
          <Col sm={9} className="justify-content-center align-items-center">
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
