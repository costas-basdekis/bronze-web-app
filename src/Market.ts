import _ from "underscore";
import { Resource } from "./Tiles";

interface MarketProperties {
  resource: Resource;
  maxOpenSlots: number;
  openSlots: number;
}

export class Market implements MarketProperties {
  resource: Resource;
  maxOpenSlots: number;
  openSlots: number;

  constructor(properties: MarketProperties) {
    this.resource = properties.resource;
    this.maxOpenSlots = properties.maxOpenSlots;
    this.openSlots = properties.openSlots;
  }

  _change(someProperties: Partial<MarketProperties>): Market {
    return new Market({
      ...this,
      ...someProperties,
    });
  }

  getResourceCost(count: number): number {
    let cost = 0;
    for (const openSlots of _.range(this.openSlots, this.openSlots + count)) {
      cost += this.getResourceCostForOpenSlots(openSlots);
    }
    return cost;
  }

  getResourceCostForOpenSlots(openSlots: number): number {
    if (openSlots > this.maxOpenSlots) {
      openSlots = this.maxOpenSlots;
    }
    return Math.floor(openSlots / 2) + 1;
  }


}


