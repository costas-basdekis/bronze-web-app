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
          <button onClick={this.onFinishTurn}>Finish turn</button>
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

  onFinishTurn = () => {
    this.setState(({ currentPlayerIndex, moveDescriptions }) => {
      const newCurrentPlayerIndex = currentPlayerIndex === 1 ? 2 : 1;
      return {
        currentPlayerIndex: newCurrentPlayerIndex,
        moveDescriptions: [...moveDescriptions, `Player ${currentPlayerIndex} finished their turn`],
      };
    });
  };
}

export default App;
