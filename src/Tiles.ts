export enum Building {
  Food = "Food",
  Clothing = "Clothing",
  Furniture = "Furniture",
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
]);
