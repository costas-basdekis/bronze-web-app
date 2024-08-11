import {originalDeckDescription, PlayerCount} from "./Cards";
import {Building} from "./Tiles";

describe("Cards", () => {
  describe("originalDeckDescription", () => {
    function getCardCount(playerCount: PlayerCount, value: string | Building): number {
      return originalDeckDescription.cardsByPlayerCount.get(playerCount)!
        .filter(card => card.area === value || card.buildings?.includes(value as Building))
        .length
    }
    it("has correct sizes and counts for 2", () => {
      expect(getCardCount(2, Building.Steel)).toEqual(4);
      expect(getCardCount(2, Building.Fuel)).toEqual(2);
      expect(getCardCount(2, Building.Clothing)).toEqual(0);
      expect(getCardCount(2, "Birmingham")).toEqual(3);
      expect(getCardCount(2, "Leek")).toEqual(0);
      expect(getCardCount(2, "Belper")).toEqual(0);
      expect(originalDeckDescription.cardsByPlayerCount.get(2)!.length).toEqual(10 * 2 * 2);
    });
    it("has correct sizes and counts for 3", () => {
      expect(getCardCount(3, Building.Steel)).toEqual(4);
      expect(getCardCount(3, Building.Fuel)).toEqual(2);
      expect(getCardCount(3, Building.Clothing)).toEqual(6);
      expect(getCardCount(3, "Birmingham")).toEqual(3);
      expect(getCardCount(3, "Leek")).toEqual(2);
      expect(getCardCount(3, "Belper")).toEqual(0);
      expect(originalDeckDescription.cardsByPlayerCount.get(3)!.length).toEqual(9 * 3 * 2);
    });
    it("has correct sizes and counts for 4", () => {
      expect(getCardCount(4, Building.Steel)).toEqual(4);
      expect(getCardCount(4, Building.Fuel)).toEqual(3);
      expect(getCardCount(4, Building.Clothing)).toEqual(8);
      expect(getCardCount(4, "Birmingham")).toEqual(3);
      expect(getCardCount(4, "Leek")).toEqual(2);
      expect(getCardCount(4, "Belper")).toEqual(2);
      expect(originalDeckDescription.cardsByPlayerCount.get(4)!.length).toEqual(8 * 4 * 2);
    });
  });
});
