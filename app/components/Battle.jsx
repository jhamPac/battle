import React         from 'react';
import { Link }      from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      username: value
    });
  }

  render() {

    return (
      <form className="column" onSubmit={ this.handleSubmit }>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    );

  }

};

export default class Battle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }

  handleSubmit = (id, username) => {

    let newState = {};
    newState[id + 'Name'] = username;
    newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

    this.setState(newState);
  }

  handleReset = (id) => {
    let newState = {};
    newState[id + 'Name'] = '';
    newState[id + 'Image'] = null;

    this.setState(newState);
  }

  render() {

    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoName = this.state.playerTwoName;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

            {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'>
              <button
                className='reset'
                onClick={() => this.handleReset('playerOne')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

            {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id='playerTwo'>
              <button
                className='reset'
                onClick={() => this.handleReset('playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
              Battle
          </Link>}

      </div>
    );
  }

};
