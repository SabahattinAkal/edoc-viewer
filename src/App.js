import React, { Component } from 'react';
import './App.css';
import Main from './Components/Main';

class App extends Component {
  state = { darkMode: false };

  componentDidMount() {
    document.title = 'Xml-Lab · dievplc.com';
  }

  render() {
    return (
      <div className={this.state.darkMode ? 'app app--dark' : 'app'}>
        <Main
          darkMode={this.state.darkMode}
          onThemeToggle={() => this.setState((state) => ({ darkMode: !state.darkMode }))}
        />
      </div>
    );
  }
}

export default App;
