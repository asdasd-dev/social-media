import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import store from './app/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

// set authorization token if already exists in local storage
let user = localStorage.getItem('user');
if (user !== null) {
  let userObj = JSON.parse(user);
  axios.interceptors.request.use(function (config) {
    config.headers['x-access-token'] = userObj.accessToken;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
}


const theme = {
  primaryColor: '#005AB5'
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
