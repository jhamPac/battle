import axios from 'axios';

function fetchPopularRepos(language) {
  let encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language} &sort=stars&order=desc&type=Repositories`);

  return axios.get(encodedURI)
      .then(function(response) {
        return response.data.items;
      });
}

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`)
    .then(function(user) {
      return user.data;
    });
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(function(repos) {
      return repos.data;
    });
}

export default fetchPopularRepos;
