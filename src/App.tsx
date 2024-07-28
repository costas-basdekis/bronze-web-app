import React, {ChangeEvent} from 'react';
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

export function findStepForReducedMoneyProduction(step: StepNumber, moneyProductionCount: MoneyProductionLevel = 3): StepNumber {
  const currentMoneyProductionLevel = moneyProductionStepMap[step];
  const targetMoneyProductionLevel = currentMoneyProductionLevel - moneyProductionCount;
  for (let newStep = step - 1 ; newStep >= 0 ; newStep--) {
    const newMoneyProductionLevel = moneyProductionStepMap[newStep];
    if (newMoneyProductionLevel === targetMoneyProductionLevel) {
      return newStep;
    }
  }
  return 0;
}

function canTakeLoan(step: StepNumber): boolean {
  return moneyProductionStepMap[step] >= -7;
}

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
  newGamePlayerCount: number,
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
    newGamePlayerCount: 2,
    game: makeGame(2),
  };

  render() {
    const { newGamePlayerCount, game: {currentPlayerIndex, moveDescriptions, players} } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bronze</h1>
          <label>Player count: {newGamePlayerCount} <input type={"range"} min={2} max={4} step={1} defaultValue={2} onChange={this.onNewGamePlayerCount} /></label>
          <button onClick={this.onNewGameClick}>New game</button>
          <hr/>
          <label>Current player: {currentPlayerIndex}</label>
          <br/>
          <button onClick={this.onTakeLoan} disabled={!canTakeLoan(players[currentPlayerIndex - 1].moneyProductionStep)}>Take loan</button>
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
          players: game.players.map(player => {
            if (newCurrentPlayerIndex === 1) {
              return {
                ...player,
                money: player.money + moneyProductionStepMap[player.moneyProductionStep],
              };
            } else {
              return player;
            }
          }),
        },
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
      game: makeGame(newGamePlayerCount),
    }));
  };

  onTakeLoan = () => {
    this.setState(({ game }) => {
      const { currentPlayerIndex, players } = game;
      if (!canTakeLoan(players[currentPlayerIndex - 1].moneyProductionStep)) {
        return null;
      }
      return {
        game: {
          ...game,
          players: game.players.map(player => {
            if (player.index === currentPlayerIndex) {
              return {
                ...player,
                money: player.money + 30,
                moneyProductionStep: findStepForReducedMoneyProduction(player.moneyProductionStep),
              };
            } else {
              return player;
            }
          }),
        },
      };
    });
  };
}

export default App;
