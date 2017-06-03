import qs            from 'query-string';
import React         from 'react';
import { Link }      from 'react-router-dom';
import { battle }    from '../utils/api';
import PlayerPreview from './PlayerPreview';

function Profile(props) {
  var info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

export default class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: true,
      loading: false
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

    let winner = this.state.winner;
    let loser = this.state.loser;
    let error = this.state.error;
    let loading = this.state.loading;

    if (loading === true) {
      return <p>Loading...Please wait</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );

  }

};
