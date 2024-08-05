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
});
