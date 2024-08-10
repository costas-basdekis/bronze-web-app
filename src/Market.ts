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

  getResourceBenefit(count: number): number {
    let benefit = 0;
    if (count > this.openSlots) {count = this.openSlots};
    if (this.openSlots === 0 ) {benefit = 0} else {
      for (const openSlots of _.range(this.openSlots  - count, this.openSlots)) {
          benefit += this.getResourceCostForOpenSlots(openSlots);
      }
    }
    return benefit;
  }

  getResourceCostForOpenSlots(openSlots: number): number {
    return Math.floor(Math.min(openSlots, this.maxOpenSlots) / 2) + 1;
  }


}
