import React from 'react';
import './App.css';

const MinMoneyProductionLevel: number = -10;
const MaxMoneyProductionLevel: number = 30;
const MoneyProductionStepDescriptions: { moneyProductionLevelEnd: number, stepCount: number }[] = [
  { moneyProductionLevelEnd: 0, stepCount: 1 },
  { moneyProductionLevelEnd: 10, stepCount: 2 },
  { moneyProductionLevelEnd: 20, stepCount: 3 },
  { moneyProductionLevelEnd: 29, stepCount: 4 },
  { moneyProductionLevelEnd: 30, stepCount: 3 },
];

// Get the money production from the step number
type StepNumber = number
type MoneyProductionLevel = number
export type MoneyProductionStepMap = {[key: StepNumber]: MoneyProductionLevel}

export function createMoneyProductionStepMap(): MoneyProductionStepMap {
  const stepMap: MoneyProductionStepMap = {};
  let moneyProductionLevelStart = MinMoneyProductionLevel;
  let stepStart = 0;
  for (const description of MoneyProductionStepDescriptions) {
    const moneyProductionLevelEnd = description.moneyProductionLevelEnd;
    const stepCount = description.stepCount;
    for (let moneyProductionLevel = moneyProductionLevelStart ; moneyProductionLevel <= moneyProductionLevelEnd ; moneyProductionLevel += 1) {
      for (let step = stepStart ; step < stepStart + stepCount ; step += 1) {
        stepMap[step] = moneyProductionLevel;
      }
      stepStart = stepStart + stepCount;
    }
    moneyProductionLevelStart = moneyProductionLevelEnd + 1;
  }
  return stepMap;
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
