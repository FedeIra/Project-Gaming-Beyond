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

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// reportWebVitals();
