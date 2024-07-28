import React from 'react';
import _ from "underscore";
import './App.css';

export type MoneyProductionStepMap = number[];

export function createMoneyProductionStepMap(): MoneyProductionStepMap {
  const steps2Money: MoneyProductionStepMap = [];
  for (let i = 0; i < 100; i++) {
    steps2Money.push(i === 0 ? -10 : 0);
  }

  for (let i = 1; i < 100; i++) {
    const shouldBump = (i >= 1 && i <= 10) ||
                       (i >= 11 && i <= 29 && (i - 11) % 2 === 0) ||
                       (i >= 31 && i <= 58 && (i - 31) % 3 === 0) ||
                       (i >= 61 && i <= 97 && (i - 61) % 4 === 0);
    const bump = shouldBump ? 1 : 0;
    steps2Money[i] = steps2Money[i - 1] + bump;
  }

  return steps2Money;
}

const moneyProductionStepMap: MoneyProductionStepMap = createMoneyProductionStepMap(); 

interface Player {
  index: number,
  money: number,
  moneyProductionStep: number,
}

interface Game {
  currentPlayerIndex: number,
  moveDescriptions: string[],
  players: Player[],
}

interface AppState {
  game: Game,
}

function makeGame(playerCount: number): Game {
  return {
    currentPlayerIndex: 1,
    moveDescriptions: ["Game started"],
    players: makePlayers(playerCount),
  };
}

function makePlayers(count: number): Player[] {
  return _.range(1, count + 1)
    .map(index => makePlayer(index));
}

function makePlayer(index: number): Player {
  return {
    index: index,
    money: 17,
    moneyProductionStep: 10,
  };
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    game: makeGame(4),
  };

  render() {
    const { game: {currentPlayerIndex, moveDescriptions, players} } = this.state;
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
      const { currentPlayerIndex, moveDescriptions, players } = game;
      const newCurrentPlayerIndex = currentPlayerIndex === players.length ? 1 : currentPlayerIndex + 1;
      return {
        game: {
          ...game,
          currentPlayerIndex: newCurrentPlayerIndex,
          moveDescriptions: [...moveDescriptions, `Player ${currentPlayerIndex} finished their turn`],
        },
      };
    });
  };
}

export default App;
