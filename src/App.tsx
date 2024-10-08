import React, {ChangeEvent} from 'react';
import './App.css';
import {Game, moneyProductionStepMap} from "./Game";
import './Tiles'
import {Building} from "./Tiles";

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
          <label>Current round: {game.currentRound}</label>
          <label>Current player: {currentPlayerIndex}</label>
          <label>Cards remaining: {game.remainingCardCount}</label>
          <br/>
          <button onClick={this.onTakeLoan} disabled={!game.canTakeLoan()}>Take loan</button>
          <button onClick={this.onFinishTurn} disabled={game.canTakeAction()}>Finish turn</button>
          <br/>
          <table>
            <thead>
            <tr>
              <th>Player</th>
              <th>Card count</th>
              <th>Money</th>
              <th>Money production (step)</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {players.map(player => (
              <tr>
                <td>{player.index}</td>
                <td>{player.cardCount}</td>
                <td>{player.money}</td>
                <td>{moneyProductionStepMap[player.moneyProductionStep]} ({player.moneyProductionStep})</td>
                <td>{currentPlayerIndex === player.index ? "Playing" : ""}</td>
              </tr>
            ))}
            </tbody>
          </table>
          {players.map(player => <>
            <h2>Player {player.index}</h2>
            <ul>
              {(Array.from(player.remainingTiles.keys()) as Building[]).map(building => (
                <li>
                  {building}:
                  {player.remainingTiles.get(building)!.length > 0 ? <>
                    {" "}L{player.remainingTiles.get(building)![0].tile.level}
                    {" "}x {player.remainingTiles.get(building)![0].count}
                    {currentPlayerIndex === player.index ? (
                      <button onClick={() => this.onDevelop(building)} disabled={!game.canDevelop(building)}>Develop</button>
                    ) : null}
                  </> : " No more buildings"}
                </li>
              ))}
            </ul>
          </>)}
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

  onDevelop = (building: Building) => {
    this.setState(({ game }) => {
      return {
        game: game.develop(building),
      };
    });
  }
}

export default App;
