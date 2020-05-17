import React from 'react';
// import { connect } from 'react-redux';

// import './Home.css';



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
