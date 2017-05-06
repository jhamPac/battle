import React from 'react';

class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    // always call in correct context; this component; only for eventHandlers
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(event) {
    this.setState({ selectedLanguage: event.currentTarget.dataset.lang });
  }

  render() {

    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className="languageUL">

      {languages.map((language) => {

        return (<li
                  data-lang={language}
                  key={language}
                  onClick={this.updateLanguage}
                  style={language === this.state.selectedLanguage ? { color: '#D0021b' } : null }>
                  {language}
              </li>);

      })}

      </ul>
    );
  }
}

export default Popular;
