import React from 'react';
import { connect } from 'react-redux';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

import logo from '../../logo.svg';
import './Home.css';

import { itemListFetch } from '../../store/actions/ItemListActions';
import { userAuthentication } from '../../store/actions/AuthenticationActions';



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
      <div>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hi from Home Page
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
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
