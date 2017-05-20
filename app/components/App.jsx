import React    from 'react';
import { Home } from './Home';
import { Nav }  from './Nav';
import Popular  from './Popular';
import Battle   from './Battle';
import Results  from './Results';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class App extends React.Component {

  render() {

    return (
      <Router>
        <div className="container">

          <Nav />

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/battle' component={ Battle } />
            <Route exact path='/battle/results' component={ Results } />
            <Route path='/popular' component={ Popular } />
            <Route render={function() {
                return <p>404 Not Found</p>
              }} />
          </Switch>

        </div>
      </Router>
    );
  }
}
