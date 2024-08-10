import { Market } from "./Market";
import { Resource } from './Tiles';

describe("Market", () => {
  describe("getResourceCost", () => {
    it("gets correct cost of resource starting from 0 open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 0,
      });
      expect(market.getResourceCost(1)).toEqual(1);
      expect(market.getResourceCost(2)).toEqual(2);
      expect(market.getResourceCost(3)).toEqual(4);
      expect(market.getResourceCost(4)).toEqual(6);
      expect(market.getResourceCost(5)).toEqual(9);
    });
    it("gets correct cost of resource starting from 1 open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 1,
      });
      expect(market.getResourceCost(1)).toEqual(1);
      expect(market.getResourceCost(2)).toEqual(3);
      expect(market.getResourceCost(3)).toEqual(5);
      expect(market.getResourceCost(4)).toEqual(8);
      expect(market.getResourceCost(5)).toEqual(11);
    });
    it("gets correct cost of resource starting from max open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 14,
      });
      expect(market.getResourceCost(1)).toEqual(8);
      expect(market.getResourceCost(2)).toEqual(16);
      expect(market.getResourceCost(3)).toEqual(24);
      expect(market.getResourceCost(4)).toEqual(32);
      expect(market.getResourceCost(5)).toEqual(40);
    });
  });
  describe("getResourceBenefit", () => {
    it("gets correct benefit of resource starting from 0 open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 0,
      });
      expect(market.getResourceBenefit(1)).toEqual(0);
      expect(market.getResourceBenefit(2)).toEqual(0);
      expect(market.getResourceBenefit(3)).toEqual(0);
      expect(market.getResourceBenefit(4)).toEqual(0);
      expect(market.getResourceBenefit(5)).toEqual(0);
    });
    it("gets correct cost of resource starting from 4 open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 4,
      });
      expect(market.getResourceBenefit(1)).toEqual(2);
      expect(market.getResourceBenefit(2)).toEqual(4);
      expect(market.getResourceBenefit(3)).toEqual(5);
      expect(market.getResourceBenefit(4)).toEqual(6);
      expect(market.getResourceBenefit(5)).toEqual(6);
    });
    it("gets correct cost of resource starting from max open slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 14,
      });
      expect(market.getResourceBenefit(1)).toEqual(7);
      expect(market.getResourceBenefit(2)).toEqual(14);
      expect(market.getResourceBenefit(3)).toEqual(20);
      expect(market.getResourceBenefit(4)).toEqual(26);
      expect(market.getResourceBenefit(5)).toEqual(31);
    });
  });
  describe("buy", () => {
    it("gets correct open slots after buying starting with 0 slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 0,
      });
      expect(market.buy(1).openSlots).toEqual(1);
      expect(market.buy(2).openSlots).toEqual(2);
      expect(market.buy(3).openSlots).toEqual(3);
      expect(market.buy(4).openSlots).toEqual(4);
      expect(market.buy(5).openSlots).toEqual(5);
      expect(market.buy(13).openSlots).toEqual(13);
      expect(market.buy(15).openSlots).toEqual(14);
      expect(market.buy(16).openSlots).toEqual(14);
    });
    it("gets open slots after selling starting with 0 slots", () => {
      const market = new Market({
        resource: Resource.Fuel,
        maxOpenSlots: 14,
        openSlots: 4,
      });
      expect(market.sell(1).openSlots).toEqual(3);
      expect(market.sell(2).openSlots).toEqual(2);
      expect(market.sell(3).openSlots).toEqual(1);
      expect(market.sell(4).openSlots).toEqual(0);
      expect(() => market.sell(5)).toThrow("You cannot sell that much you moron.");
    });
  });
});

