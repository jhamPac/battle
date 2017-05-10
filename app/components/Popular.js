import React from 'react';
import PropTypes from 'prop-types';
import fetchPopularRepos from '../utils/api';

function SelectedLanguage(props) {

  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languageUL">

    {languages.map((language) => {

      return (<li
                data-lang={language}
                key={language}
                onClick={props.onSelect}
                style={language === props.selectedLanguage ? { color: '#D0021b' } : null }>
                {language}
            </li>);

    })}

    </ul>
  );

}

// rules for what you pass in the props
SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    // always call in correct context; this component; only for eventHandlers
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    fetchPopularRepos('Java');
  }

  updateLanguage(event) {
    this.setState({ selectedLanguage: event.currentTarget.dataset.lang });
  }

  render() {

    return (
      <SelectedLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
    );
  }
}

export default Popular;
