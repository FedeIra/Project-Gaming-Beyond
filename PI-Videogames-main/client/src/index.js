// Import react utilities:
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import app component and store:
import App from './App';
import { store } from './store';
// import reportWebVitals from './reportWebVitals';

// Import style:
import './index.css';

// TODO: deploy (down):
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
// TODO: deploy (up)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// reportWebVitals();
