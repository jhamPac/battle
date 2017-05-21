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

function getStarCount(repos) {
  return repos.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return ( followers * 3 ) + totalStars;
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

function handleErros(error) {
  console.warn(error);
  return null;
}

export function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    let profile = data[0];
    let repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

export default fetchPopularRepos;
