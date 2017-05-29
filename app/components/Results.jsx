import React from 'react';
import qs from 'query-string';
import { battle } from '../utils/api';

export default class Results extends React.Component {

  componentDidMount = () => {
    let players = qs.parse(this.props.location.search);

    battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results) {
      console.log(results);
    });
  }

  render() {

    return (
      <div>
        <h1>Hello</h1>
      </div>
    );

  }

};
