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
    count = Math.min(count, this.openSlots);
    let benefit = 0;
    for (const openSlots of _.range(this.openSlots  - count, this.openSlots)) {
      benefit += this.getResourceCostForOpenSlots(openSlots);
    }
    return benefit;
  }

  getResourceCostForOpenSlots(openSlots: number): number {
    return Math.floor(Math.min(openSlots, this.maxOpenSlots) / 2) + 1;
  }

  buy(count: number): Market {
    return this._change({
      openSlots: Math.min(this.openSlots + count, this.maxOpenSlots),
    });
  }

  sell(count: number): Market {
    if (count > this.openSlots) {
      throw new Error("You cannot sell that much you moron.");
    }
    return this._change({
      openSlots: this.openSlots - count,
    });
  }
}
