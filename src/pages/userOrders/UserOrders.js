import React from 'react';
// import { connect } from 'react-redux';

// import './Home.css';



// User order page to list out all the users previously placed orders
class UserOrders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_open: true,
    }

  }

  render() {

    return (
      <div>
        <p>
          Hi from User Orders Page
        </p>
      </div>
    );
  }
}



export default UserOrders
