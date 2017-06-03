import React from 'react';
import qs from 'query-string';
import { battle } from '../utils/api';

export default class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount = () => {

    let players = qs.parse(this.props.location.search);

    battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((players) => {

      if (players === null) {
        return this.setState({
          error: 'Error: Make sure both players exist',
          loading: false
        });
      }

      this.setState({
        winner: players[0],
        loser: players[1],
        error: null,
        loading: false
      });

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
