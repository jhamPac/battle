import React              from 'react';
import Loading            from './Loading';
import PropTypes          from 'prop-types';
import fetchPopularRepos  from '../utils/api';

let SelectedLanguage = (props) => {

  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languageUL">

    {/* onClick is going to pass in their own lang */}
    {languages.map((language) => {

      return (<li
                data-lang={language}
                key={language}
                onClick={props.onSelect.bind(null, language)}
                style={language === props.selectedLanguage ? { color: '#D0021b' } : null }>
                {language}
            </li>);

    })}

    </ul>
  );

};

let ReposGrid = (props) => {

  return (
    <ul className="popular-list">

    {props.repos.map((repo, index) => {
      return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
    })}

    </ul>
  );

};

// rules for what you pass in the props
SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    // always call in correct context; this component; only for eventHandlers
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang) => {

    // reset repos
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    fetchPopularRepos(lang).then((repos) => {
      this.setState({ repos });
    });
  }

  render() {

    return (
      <div>
      <SelectedLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
      {(!this.state.repos)
        ? <Loading text='Downloading'/>
        : <ReposGrid repos={this.state.repos} />
      }
      </div>
    );
  }
}
