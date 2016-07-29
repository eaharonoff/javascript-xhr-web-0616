function showRepositories(event, data) {
  //parse the responseText into JSON - store it in repos variable
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  //1. creates an unordered list
  //2. runs a .map() on each of the repos (denoted by 'r') extracted from the responseText
  //3. wraps each repo name (name is a key in the API) into a <li> 
  //4. provides a link for the specific repo name under the data attribute 'data-repo='
  //5. on a click it will run function getCommit() which will make a request to the API
  // debugger 
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load",showRepositories)
  req.open("GET",'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits(event,data){
  
  var commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}