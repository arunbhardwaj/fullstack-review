import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.onChange = this.onChange.bind(this);
    // this.onKeyPressSearch = this.onKeyPressSearch.bind(this); // why must you bind instead of using anon function?
    // You don't, it's because you didn't have the event parameter there dummy.
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  onKeyPressSearch(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.props.onSearch(this.state.term);
    console.log('searching for ', this.state.term);
    this.setState({
      term: '',
    })
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange} onKeyPress={(e) => this.onKeyPressSearch(e)}/>
      <button onClick={() => this.search()} > Add Repos </button>
    </div>)
  }
}

export default Search;