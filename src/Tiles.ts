export enum Building {
  Food = "Food",
  Clothing = "Clothing",
  Earthenware = "Earthenware",
  Cider = "Cider",
  Fuel = "Fuel",
  Steel = "Steel",
}

export enum Resource {
  Cider = "Cider",
  Fuel = "Fuel",
  Steel = "Steel",
}

export interface Tile {
  building: Building,
  level: number,
  monetaryBuildCost: number,
  fuelBuildCost: number,
  steelBuildCost: number,
  beerSellCost: number,
  pointsReward: number,
  moneyProductionReward: number,
  canalResourceReward: number,
  rewardResource: Resource | null,
  railroadResourceReward: number,
  linkCount: number,
  canBeDeveloped: boolean,
  canBeBuiltInCanal: boolean,
  canBeBuiltInRailroad: boolean,
}

interface TileDescription {
  tile: Tile,
  count: number,
}

export type PlayerTiles = Map<Building, TileDescription[]>;

function makeTiles(
  commonProperties: {building: Building} & Partial<Tile>,
  tilesPropertyNames: (keyof Tile)[],
  tilesProperties: {count: number, values: any[], extra?: Partial<Tile>}[],
): [Building, TileDescription[]] {
  /**
   * Define tiles for a building, by defining:
   *  1. Common properties for all levels
   *  2. The keys of the properties that will be variable for each level
   *  3. The values of the properties for the defined keys
   *  4. Plus optionally some extra values
   *
   * @param commonProperties - The properties that are common to all building levels
   * @param tilePropertyNames - The names of the properties that each level has to define
   * @param tileProperties - The specification of each level. The `values` attribute needs to be in the same order as
   *  the `tilePropertyNames`
   */
  return [
    commonProperties.building,
    tilesProperties.map(tileProperties => ({
      tile: {
        ...commonProperties,
        ...Object.fromEntries(tilesPropertyNames.map(
          (name, index) => [name, tileProperties.values[index]])),
        ...tileProperties.extra,
      } as Tile,
      count: tileProperties.count,
    })),
  ];
}

export const initialPlayerTiles: PlayerTiles = new Map([
  makeTiles({
    building: Building.Food,
    canalResourceReward: 0,
    rewardResource: null,
    railroadResourceReward: 0,
    canBeDeveloped: true,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
  }, [
    "level",
    "monetaryBuildCost",
    "fuelBuildCost",
    "steelBuildCost",
    "beerSellCost",
    "pointsReward",
    "moneyProductionReward",
    "linkCount",
  ], [
    {count: 1, values: [1, 8, 1, 0, 1, 3, 5, 2], extra: {canBeBuiltInRailroad: false}},
    {count: 2, values: [2, 10, 0, 1, 1, 5, 0, 1]},
    {count: 1, values: [3, 12, 2, 0, 0, 4, 4, 0]},
    {count: 1, values: [4, 14, 0, 1, 1, 3, 7, 1]},
    {count: 2, values: [5, 16, 1, 0, 2, 8, 2, 2]},
    {count: 1, values: [6, 20, 0, 0, 1, 7, 6, 1]},
    {count: 1, values: [7, 16, 1, 1, 0, 9, 4, 0]},
    {count: 2, values: [8, 20, 0, 2, 1, 11, 1, 1]},
  ]),
  makeTiles({
    building: Building.Clothing,
    canalResourceReward: 0,
    rewardResource: null,
    railroadResourceReward: 0,
    canBeDeveloped: true,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
  }, [
    "level",
    "monetaryBuildCost",
    "fuelBuildCost",
    "steelBuildCost",
    "beerSellCost",
    "pointsReward",
    "moneyProductionReward",
    "linkCount",
  ], [
    {count: 3, values: [1, 12, 0, 0, 1, 5, 5, 1], extra: {canBeBuiltInRailroad: false}},
    {count: 2, values: [2, 14, 1, 0, 1, 5, 4, 2]},
    {count: 3, values: [3, 16, 1, 1, 1, 9, 3, 1]},
    {count: 3, values: [4, 18, 1, 1, 1, 12, 2, 1]},
  ]),
  makeTiles({
    building: Building.Earthenware,
    canalResourceReward: 0,
    rewardResource: null,
    railroadResourceReward: 0,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
  }, [
    "level",
    "monetaryBuildCost",
    "fuelBuildCost",
    "steelBuildCost",
    "beerSellCost",
    "pointsReward",
    "moneyProductionReward",
    "linkCount",
    "canBeDeveloped",
  ], [
    {count: 1, values: [1, 17, 0, 1, 1, 10, 5, 1, false]},
    {count: 1, values: [2, 0, 1, 0, 1, 1, 1, 1, true]},
    {count: 1, values: [3, 22, 2, 0, 2, 11, 5, 1, false]},
    {count: 1, values: [4, 0, 1, 0, 1, 1, 1, 1, true]},
    {count: 1, values: [5, 24, 2, 0, 2, 20, 5, 1, true], extra: {canBeBuiltInCanal: false}},
  ]),
  makeTiles({
    building: Building.Cider,
    canalResourceReward: 1,
    rewardResource: Resource.Cider,
    railroadResourceReward: 2,
    fuelBuildCost: 0,
    steelBuildCost: 1,
    beerSellCost: 0,
    moneyProductionReward: 5,
    linkCount: 2,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
    canBeDeveloped: true,
  }, [
    "level",
    "monetaryBuildCost",
    "pointsReward",
  ], [
    {count: 2, values: [1, 5, 4], extra: {moneyProductionReward: 4, railroadResourceReward: 1, canBeBuiltInRailroad: false}},
    {count: 2, values: [2, 7, 5]},
    {count: 2, values: [3, 9, 7]},
    {count: 1, values: [4, 9, 10], extra: {canBeBuiltInCanal: false}},
  ]),
  makeTiles({
    building: Building.Fuel,
    fuelBuildCost: 0,
    beerSellCost: 0,
    rewardResource: Resource.Fuel,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
    canBeDeveloped: true,
  }, [
    "level",
    "monetaryBuildCost",
    "steelBuildCost",
    "pointsReward",
    "moneyProductionReward",
    "canalResourceReward",
    "railroadResourceReward",
    "linkCount",
  ], [
    {count: 1, values: [1, 5, 0, 1, 4, 2, 2, 2], extra: {canBeBuiltInRailroad: false}},
    {count: 2, values: [2, 7, 0, 2, 7, 3, 3, 1]},
    {count: 2, values: [3, 8, 1, 3, 6, 4, 4, 1]},
    {count: 2, values: [4, 10, 1, 4, 5, 5, 5, 1]},
  ]),
  makeTiles({
    building: Building.Steel,
    fuelBuildCost: 1,
    steelBuildCost: 0,
    beerSellCost: 0,
    rewardResource: Resource.Steel,
    linkCount: 1,
    canBeBuiltInCanal: true,
    canBeBuiltInRailroad: true,
    canBeDeveloped: true,
  }, [
    "level",
    "monetaryBuildCost",
    "pointsReward",
    "moneyProductionReward",
    "canalResourceReward",
    "railroadResourceReward",
  ], [
    {count: 1, values: [1, 5, 3, 3, 4, 4], extra: {canBeBuiltInRailroad: false}},
    {count: 1, values: [2, 7, 5, 3, 4, 4]},
    {count: 1, values: [3, 9, 7, 2, 5, 5]},
    {count: 1, values: [4, 12, 9, 1, 6, 6]},
  ]),
]);
