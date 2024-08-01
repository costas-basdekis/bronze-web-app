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

export const initialPlayerTiles: Map<Building, {tile: Tile, count: number}[]> = new Map([
  [Building.Food, [
    {
      tile: {
        building: Building.Food,
        level: 1,
        monetaryBuildCost: 8,
        fuelBuildCost: 1,
        steelBuildCost: 0,
        beerSellCost: 1,
        pointsReward: 3,
        moneyProductionReward: 5,
        canalResourceReward: 0,
        rewardResource: null,
        railroadResourceReward: 0,
        linkCount: 2,
        canBeDeveloped: true,
        canBeBuiltInCanal: true,
        canBeBuiltInRailroad: false,
      },
      count: 1,
    },
  ]],
]);
