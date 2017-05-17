import React from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <Route path='/popular' component={Popular} />
        </div>
      </BrowserRouter>
    );
  }
}
