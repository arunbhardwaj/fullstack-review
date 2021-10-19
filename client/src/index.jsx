import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { sendUsernameToServer, getTopRepos } from './lib/github.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    axios.get('/repos')
      .then(({data: repos}) => this.setState({repos}))
      .catch(err => console.log(err));
    // getTopRepos().then(results => this.setState({repos: results.data}));
  }

  search (term) {
    sendUsernameToServer({username: term}, (result) => {
      this.setState({repos: result})
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