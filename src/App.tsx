import React from 'react';
import './App.css';

interface AppState {
  currentPlayerIndex: number,
  moveDescriptions: string[],
}

class App extends React.Component<{}, AppState> {
  state = {
    currentPlayerIndex: 1,
    moveDescriptions: ["Game started"],
  };

  render() {
    const { currentPlayerIndex, moveDescriptions } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bronze</h1>
          <label>Current player: {currentPlayerIndex}</label>
          <br/>
          <ol>
            {moveDescriptions.map(description => (
              <li>{description}</li>
            ))}
          </ol>
        </header>
      </div>
    );
  }
}

export default App;
