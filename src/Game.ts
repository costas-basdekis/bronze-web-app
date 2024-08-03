import _ from "underscore";
import {Building, initialPlayerTiles, PlayerTiles} from "./Tiles";

export type MoneyProductionStepMap = number[];

export function createMoneyProductionStepMap(): MoneyProductionStepMap {
  const stepMap: MoneyProductionStepMap = new Array(100).fill(0);
  stepMap[0] = -10;

  for (let i = 1; i < 100; i++) {
    const shouldBump = (
      (i >= 1 && i <= 10) 
      || (i >= 11 && i <= 29 && (i - 11) % 2 === 0) 
      || (i >= 31 && i <= 58 && (i - 31) % 3 === 0) 
      || (i >= 61 && i <= 97 && (i - 61) % 4 === 0)
    );
    const bump = shouldBump ? 1 : 0;
    stepMap[i] = stepMap[i - 1] + bump;
  }

  return stepMap;
}

export const moneyProductionStepMap: MoneyProductionStepMap = createMoneyProductionStepMap();
type StepNumber = number
type MoneyProductionLevel = number

export function findStepForReducedMoneyProduction(step: StepNumber, moneyProductionCount: MoneyProductionLevel = 3): StepNumber {
  const currentMoneyProductionLevel = moneyProductionStepMap[step];
  const targetMoneyProductionLevel = currentMoneyProductionLevel - moneyProductionCount;
  for (let newStep = step - 1; newStep >= 0; newStep--) {
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
  remainingTiles: PlayerTiles,
}

interface GameProperties {
  currentPlayerIndex: number;
  moveDescriptions: string[];
  players: Player[];
}

export class Game implements GameProperties {
  currentPlayerIndex: number;
  moveDescriptions: string[];
  players: Player[];

  /**
   * Create a new game from start.
   *
   * @param playerCount - The number of players
   * @returns A new game
   */
  static make(playerCount: number): Game {
    return new Game({
      currentPlayerIndex: 1,
      moveDescriptions: ["Game started"],
      players: this._makePlayers(playerCount),
    });
  }

  static _makePlayers(count: number): Player[] {
    return _.range(1, count + 1)
      .map(index => this._makePlayer(index));
  }

  static _makePlayer(index: number): Player {
    return {
      index: index,
      money: 17,
      moneyProductionStep: 10,
      remainingTiles: initialPlayerTiles,
    };
  }

  constructor(properties: GameProperties) {
    this.currentPlayerIndex = properties.currentPlayerIndex;
    this.moveDescriptions = properties.moveDescriptions;
    this.players = properties.players;
  }

  _change(someProperties: Partial<GameProperties>): Game {
    return new Game({
      ...this,
      ...someProperties,
    });
  }

  /**
  * Check if the current player can take a loan
  */
  canTakeLoan(): boolean {
    return moneyProductionStepMap[this.players[this.currentPlayerIndex - 1].moneyProductionStep] >= -7;
  }

  /**
   * Make the current player take a loan
   */
  takeLoan(): Game {
    const {currentPlayerIndex, players} = this;
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

  canDevelop(building: Building): boolean {
    const {currentPlayerIndex, players} = this;
    const currentPlayer = players[currentPlayerIndex - 1];
    const levels = currentPlayer.remainingTiles.get(building)!;
    if (levels.length === 0) {
      return false;
    }
    const currentLevel = levels[0];
    return currentLevel.tile.canBeDeveloped;
  }

  develop(building: Building): Game {
    if (!this.canDevelop(building)) {
      return this;
    }
    const {currentPlayerIndex, players} = this;
    return this._change({
      players: players.map(player => {
        if (player.index === currentPlayerIndex) {
          const newRemainingTiles = new Map(player.remainingTiles);
          const currentLevel = newRemainingTiles.get(building)![0];
          const restLevels = newRemainingTiles.get(building)!.slice(1);
          if (currentLevel.count === 1) {
            newRemainingTiles.set(building, restLevels);
          } else {
            newRemainingTiles.set(building, [
              {
                ...currentLevel,
                count: currentLevel.count - 1,
              },
              ...restLevels,
            ]);
          }
          return {
            ...player,
            remainingTiles: newRemainingTiles,
          };
        } else {
          return player;
        }
      })
    });
  }

  /**
   * Finish the current player's turn. If it's the last player, it also ends the round
   */
  finishTurn(): Game {
    const {currentPlayerIndex, moveDescriptions, players} = this;
    const newCurrentPlayerIndex = currentPlayerIndex === players.length ? 1 : currentPlayerIndex + 1;
    return this._change({
      currentPlayerIndex: newCurrentPlayerIndex,
      moveDescriptions: [...moveDescriptions, `Player ${currentPlayerIndex} finished their turn`],
      players: this.players.map(player => {
        if (newCurrentPlayerIndex === 1) {
          return {
            ...player,
            money: Math.max(0, player.money + moneyProductionStepMap[player.moneyProductionStep]),
          };
        } else {
          return player;
        }
      }),
    });
  }
}
