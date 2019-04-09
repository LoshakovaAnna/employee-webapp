import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reducers from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}