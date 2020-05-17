import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import {store} from './store'

import App from './App';
import * as serviceWorker from './serviceWorker';


function ReduxApp() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/"}>
          <App />
      </BrowserRouter>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <ReduxApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
