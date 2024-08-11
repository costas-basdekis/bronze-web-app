import {Building} from "./Tiles";
import _ from "underscore";

export type PlayerCount = 2 | 3 | 4;

export interface Card {
  type: "area" | "building",
  area: string | null,
  buildings: Building[] | null,
  isWild: boolean,
}

export interface Deck {
  playerCount: PlayerCount,
  cards: Card[],
  initialCards: Card[],
}

export interface DeckDescription {
  cardsByPlayerCount: Map<PlayerCount, Card[]>,
}

type CompactCardDescription = [string | Building | Building[], number | [number, number, number]]

function makeCompactDeckDescription(cardDescriptions: CompactCardDescription[]): DeckDescription {
  return makeDeckDescription(cardDescriptions.map(([areaOrBuildingOrBuildings, countOrCountsFor234Players]) => {
    const type = (
      (typeof areaOrBuildingOrBuildings === "string" && !(areaOrBuildingOrBuildings in Building))
        ? "area"
        : "building"
    );
    return {
      card: {
        type: type,
        area: type === "area" ? areaOrBuildingOrBuildings as string : null,
        buildings: (
          type === "building"
            ? (
              Array.isArray(areaOrBuildingOrBuildings)
                ? areaOrBuildingOrBuildings as Building[]
                : [areaOrBuildingOrBuildings] as Building[]
            )
            : null
        ),
        isWild: false,
      },
      countsFor234Players: (
        typeof countOrCountsFor234Players === "number"
          ? [countOrCountsFor234Players, countOrCountsFor234Players, countOrCountsFor234Players]
          : countOrCountsFor234Players
      ),
    };
  }))
}

interface CardDescription {
  card: Card,
  countsFor234Players: [number, number, number],
}

function makeDeckDescription(cardDescriptions: CardDescription[]): DeckDescription {
  const deckDescription: DeckDescription = {
    cardsByPlayerCount: new Map([[2, []], [3, []], [4, []]]),
  };
  for (const cardDescription of cardDescriptions) {
    const [countFor2, countFor3, countFor4] = cardDescription.countsFor234Players;
    const {card} = cardDescription;
    const countsAndCards: [number, Card[]][] = [
      [countFor2, deckDescription.cardsByPlayerCount.get(2)!],
      [countFor3, deckDescription.cardsByPlayerCount.get(3)!],
      [countFor4, deckDescription.cardsByPlayerCount.get(4)!],
    ];
    for (const [count, cards] of countsAndCards) {
      for (const _i of _.range(count)) {
        cards.push(card);
      }
    }
  }
  return deckDescription;
}

export const originalDeckDescription: DeckDescription = makeCompactDeckDescription([
  // Buildings
  [Building.Steel, 4],
  [Building.Fuel, [2, 2, 3]],
  [[Building.Clothing, Building.Food], [0, 6, 8]],
  [Building.Earthenware, [2, 2, 3]],
  [Building.Cider, 5],
  // Red
  ["Birmingham", 3],
  ["Coventry", 3],
  ["Nuneaton", 1],
  ["Redditch", 1],
  // Yellow
  ["Coalbrookdale", 3],
  ["Dudley", 2],
  ["Kidderminster", 2],
  ["Wolverhapmton", 2],
  ["Worcester", 2],
  // Orange
  ["Stafford", 2],
  ["Burton-on-Trent", 2],
  ["Cannock", 2],
  ["Tamworth", 1],
  ["Walsall", 1],
  // Blue
  ["Leek", [0, 2, 2]],
  ["Stoke-on-Trent", [0, 3, 3]],
  ["Stone", [0, 2, 2]],
  ["Uttoxeter", [0, 1, 2]],
  // Cyan
  ["Belper", [0, 0, 2]],
  ["Derby", [0, 0, 3]],
]);

export const WildArea: Card = {
  type: "area",
  area: null,
  buildings: null,
  isWild: true,
}

export const WildBuilding: Card = {
  type: "building",
  area: null,
  buildings: null,
  isWild: true,
}

export function makeDeck(deckDescription: DeckDescription, playerCount: PlayerCount): Deck {
  const cards = deckDescription.cardsByPlayerCount.get(playerCount)!;
  return {
    playerCount,
    cards,
    initialCards: cards,
  }
}
