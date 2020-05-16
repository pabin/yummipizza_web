import React from 'react';
import { connect } from 'react-redux'

import logo from '../logo.svg';
import '../App.css';

import { itemListFetch } from '../store/actions/ItemListActions'



class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
      itemList: [
          {
              "id": 1,
              "name": "Chicken Garlic Twist",
              "ms_price": 14,
              "ls_price": 20,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__340.jpg"
          },
          {
              "id": 2,
              "name": "Chicken Hawaiian",
              "ms_price": 16,
              "ls_price": 22,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_960_720.jpg"
          },
          {
              "id": 3,
              "name": "Chicken Royal",
              "ms_price": 18,
              "ls_price": 24,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2016/03/05/21/45/pizza-1239077_960_720.jpg"
          },
          {
              "id": 4,
              "name": "Chicken Tandoori",
              "ms_price": 20,
              "ls_price": 26,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2015/12/07/22/32/pizza-1081543__340.jpg"
          },
          {
              "id": 5,
              "name": "Chicken Veggie Royal",
              "ms_price": 12,
              "ls_price": 18,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2015/02/13/11/04/pizza-634967__340.jpg"
          },
          {
              "id": 6,
              "name": "Corn and Chicken Hawaiian",
              "ms_price": 15,
              "ls_price": 20,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2018/03/04/20/05/pizza-3199081__340.jpg"
          },
          {
              "id": 7,
              "name": "Spicy Chicken",
              "ms_price": 16,
              "ls_price": 22,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2015/10/17/20/22/margherita-pizza-993274__340.jpg"
          },
          {
              "id": 8,
              "name": "Chicken Hawaiian",
              "ms_price": 15,
              "ls_price": 20,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2016/02/16/07/39/pizza-1202775__340.jpg"
          },
          {
              "id": 9,
              "name": "Chicken Hawaiian",
              "ms_price": 18,
              "ls_price": 25,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2016/03/05/21/47/american-1239091__340.jpg"
          },
          {
              "id": 10,
              "name": "Chicken Hawaiian",
              "ms_price": 14,
              "ls_price": 18,
              "item_type": "NON_VEG",
              "item_image": "https://cdn.pixabay.com/photo/2017/01/22/19/12/pizza-2000595__340.jpg"
          }
      ]
    }

    // this.props.dispatchItemListFetch()
  }

  render() {
    const { itemList: {
      itemListFetched,
      itemListFetching,
      itemList,
      errorMessage,
    }} = this.props

    const items = this.state.itemList
    console.log('items length', items.length);
    
    return (
      <div className="App">
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
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
