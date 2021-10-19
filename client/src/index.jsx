import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { sendUsernameToServer, getTopRepos } from './lib/github.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    getTopRepos().then(results => this.setState({repos: results}));
  }

  search (term) {
    console.log(`${term} was searched`);
    let data = {
      username: term,
    }
    sendUsernameToServer(data, () => {
      console.log('term was sent and received by server.');
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));