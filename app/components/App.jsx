import React    from 'react';
import { Home } from './Home';
import { Nav }  from './Nav';
import Popular  from './Popular';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

export default class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container">

          <Nav />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/popular' component={Popular} />
            <Route render={function() {
                return <p>404 Not Found</p>
              }} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}
