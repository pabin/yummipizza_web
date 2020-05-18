import React, { Component, Suspense } from 'react';

import './App.css';

import NavBar from './layout/Navbar';
import Routes from "./routes/index";
import Footer from "./layout/Footer";


class App extends Component {

  constructor(props) {
    super(props)
    }


    render() {

        return (
              <div className="App">
                <NavBar />
                <div style={{"paddingTop": "70px"}}>
                  <Routes />
                </div>
                <Footer />
              </div>
        );
    }
}

export default App;
