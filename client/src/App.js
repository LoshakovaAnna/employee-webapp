import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './screens/HomePage';
import Employee from './screens/Employee';

class App extends Component {
  render() {
    return (
      <div className="container py-5">
        <Route exact path="/"              component = { HomePage } />        
        <Route       path="/employee/:id"  component = { Employee }  />
      </div>
    );
  }
}

export default App;
