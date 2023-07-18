import React, { Component } from 'react';
import { render } from 'react-dom';
import Search from './Search';
import './style.css';

class App extends Component {
  render() {
    return <Search />
  }
}

render(<App />, document.getElementById('root'));
