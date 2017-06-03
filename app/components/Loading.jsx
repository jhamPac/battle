import React from 'react';

let styles = {
  textAlign: 'center',
  fontSize: '35px'
}

export default class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  componentDidMount = () => {

    let stopper = `${this.props.text}...`;

    this.interval = window.setInterval(() => {

      if (this.state.text === stopper) {
        this.setState({
          text: this.props.text
        });
      } else {
        this.setState((prevState) => {
            return { text: prevState.text + '.' }
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  }

  render() {

    return (
      <p style={styles}>
        {this.state.text}
      </p>
    );
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};
