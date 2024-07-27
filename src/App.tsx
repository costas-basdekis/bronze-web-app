import React from 'react';
import './App.css';

interface Player {
  index: number,
  money: number,
}

interface AppState {
  currentPlayerIndex: number,
  moveDescriptions: string[],
  players: Player[],
}

class App extends React.Component<{}, AppState> {
  state = {
    currentPlayerIndex: 1,
    moveDescriptions: ["Game started"],
    players: [
      {
        index: 1,
        money: 17,
      },
      {
        index: 2,
        money: 17,
      },
    ],
  };

  render() {
    const { currentPlayerIndex, moveDescriptions, players } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bronze</h1>
          <label>Current player: {currentPlayerIndex}</label>
          <br/>
          <button onClick={this.onFinishTurn}>Finish turn</button>
          <br/>
          <table>
            <thead>
            <tr>
              <th>Player</th>
              <th>Money</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {players.map(player => (
              <tr>
                <td>{player.index}</td>
                <td>{player.money}</td>
                <td>{currentPlayerIndex === player.index ? "Playing" : ""}</td>
              </tr>
            ))}
            </tbody>
          </table>
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
