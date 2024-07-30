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

type StepNumber = number
type MoneyProductionLevel = number
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

interface Player {
  index: number,
  money: number,
  moneyProductionStep: number,
}

interface AppState {
  newGamePlayerCount: number,
  game: Game,
}

interface GameProperties {
  currentPlayerIndex: number;
  moveDescriptions: string[];
  players: Player[];
}

class Game {
  currentPlayerIndex: number;
  moveDescriptions: string[];
  players: Player[];

  static make(playerCount: number): Game {
    return new Game({
      currentPlayerIndex: 1,
      moveDescriptions: ["Game started"],
      players: makePlayers(playerCount),
    });
  }

  constructor({currentPlayerIndex, moveDescriptions, players}: GameProperties) {
    this.currentPlayerIndex = currentPlayerIndex;
    this.moveDescriptions = moveDescriptions;
    this.players = players;
  }

  _change(someProperties: Partial<GameProperties>): Game {
    return new Game({
      ...this,
      ...someProperties,
    });
  }

  canTakeLoan(): boolean {
    return moneyProductionStepMap[this.players[this.currentPlayerIndex - 1].moneyProductionStep] >= -7;
  }

  takeLoan(): Game {
    const { currentPlayerIndex, players } = this;
    if (!this.canTakeLoan()) {
      return this;
    }
    return this._change({
      players: players.map(player => {
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
    });
  }

  finishTurn(): Game {
    const { currentPlayerIndex, moveDescriptions, players } = this;
    const newCurrentPlayerIndex = currentPlayerIndex === players.length ? 1 : currentPlayerIndex + 1;
    return this._change({
      currentPlayerIndex: newCurrentPlayerIndex,
      moveDescriptions: [...moveDescriptions, `Player ${currentPlayerIndex} finished their turn`],
      players: this.players.map(player => {
        if (newCurrentPlayerIndex === 1) {
          return {
            ...player,
            money: player.money + moneyProductionStepMap[player.moneyProductionStep],
          };
        } else {
          return player;
        }
      }),
    });
  }
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
