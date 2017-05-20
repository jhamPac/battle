import React from 'react';

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

  }

  handleSubmit = (id, username) => {

    let newState = {};
    newState[id + 'Name'] = username;
    newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';

    this.setState(newState);
  }

  render() {

    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
        </div>
      </div>
    );
  }

};
