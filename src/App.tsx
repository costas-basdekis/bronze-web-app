import React, {ChangeEvent} from 'react';
import './App.css';
import {Game, moneyProductionStepMap} from "./Game";

interface AppState {
  newGamePlayerCount: number,
  game: Game,
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    newGamePlayerCount: 2,
    game: Game.make(2),
  };

  render() {
    const { newGamePlayerCount, game } = this.state;
    const { currentPlayerIndex, moveDescriptions, players } = game;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bronze</h1>
          <label>Player count: {newGamePlayerCount} <input type={"range"} min={2} max={4} step={1} defaultValue={2} onChange={this.onNewGamePlayerCount} /></label>
          <button onClick={this.onNewGameClick}>New game</button>
          <hr/>
          <label>Current player: {currentPlayerIndex}</label>
          <br/>
          <button onClick={this.onTakeLoan} disabled={!game.canTakeLoan()}>Take loan</button>
          <button onClick={this.onFinishTurn}>Finish turn</button>
          <br/>
          <table>
            <thead>
            <tr>
              <th>Player</th>
              <th>Money</th>
              <th>Money production (step)</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {players.map(player => (
              <tr>
                <td>{player.index}</td>
                <td>{player.money}</td>
                <td>{moneyProductionStepMap[player.moneyProductionStep]} ({player.moneyProductionStep})</td>
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
    this.setState(({ game }) => {
      return {
        game: game.finishTurn(),
      };
    });
  };

  onNewGamePlayerCount = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newGamePlayerCount: parseInt(event.target.value),
    });
  };

  onNewGameClick = () => {
    this.setState(({ newGamePlayerCount }) => ({
      game: Game.make(newGamePlayerCount),
    }));
  };

  onTakeLoan = () => {
    this.setState(({ game }) => {
      return {
        game: game.takeLoan(),
      };
    });
  };
}

export default App;
