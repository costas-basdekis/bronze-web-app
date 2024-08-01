/**
 * Tiles:
 *  building: Buildings
 *  level: number
 *  monetaryBuildCost: number
 *  fuelBuildCost: number
 *  steelBuildCost: number
 *  beerSellCost: number
 *  pointsReward: number
 *  moneyProductionReward: number
 *  canalResourceReward: number
 *  rewardResource: Resources
 *  railroadResourceReward: number
 *  linkCount: number
 *  canBeDeveloped: boolean
 *  canBeBuiltInCanal: boolean
 *  canBeBuiltInRailroad: boolean
 *
 * Buildings:
 *  Food
 *  Clothing
 *  Furniture
 *  Cider
 *  Fuel
 *  Steel
 *
 * Resources:
 *  Cider
 *  Fuel
 *  Steel
 *
 * PlayerMat:
 *  availableTiles: Map<Buildings, Tiles[]>
 */

export interface Tiles {
  building: Buildings,
  level: number,
  monetaryBuildCost: number,
  fuelBuildCost: number,
  steelBuildCost: number,
  beerSellCost: number,
  pointsReward: number,
  moneyProductionReward: number,
  canalResourceReward: number,
  rewardResource: Resources,
  railroadResourceReward: number,
  linkCount: number,
  canBeDeveloped: boolean,
  canBeBuiltInCanal: boolean,
  canBeBuiltInRailroad: boolean,
}
