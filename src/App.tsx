import React from 'react';
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
        moneyProductionStep: 10,
      },
      {
        index: 2,
        money: 17,
        moneyProductionStep: 10,
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
