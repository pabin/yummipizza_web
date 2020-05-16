import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import {store} from './store'



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/home"}>
          <Home />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
