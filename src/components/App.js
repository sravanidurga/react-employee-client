import React, { Component } from 'react';

import Employees from './Employees/Employees';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
      <title>Employees</title>
      {/* <h1>React Application</h1> */}
      <Employees/>
      </div>
    );
  } 
}

export default App;
