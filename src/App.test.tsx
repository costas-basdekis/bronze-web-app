import {MoneyProductionStepMap, createMoneyProductionStepMap, findStepForReducedMoneyProduction} from './App';

describe("createMoneyProductionStepMap", () => {
  const moneyProductionStepMap: MoneyProductionStepMap = createMoneyProductionStepMap();
  it("assigns correct values", () => {
    expect(moneyProductionStepMap[0]).toEqual(-10);
    expect(moneyProductionStepMap[9]).toEqual(-1);
    expect(moneyProductionStepMap[10]).toEqual(0);
    expect(moneyProductionStepMap[11]).toEqual(1);
    expect(moneyProductionStepMap[20]).toEqual(5);
    expect(moneyProductionStepMap[30]).toEqual(10);
    expect(moneyProductionStepMap[31]).toEqual(11);
    expect(moneyProductionStepMap[32]).toEqual(11);
    expect(moneyProductionStepMap[65]).toEqual(22);
  });
});

describe("findStepForReducedMoneyProduction", () => {
  it("finds correct reduced money production level", () => {
    expect(findStepForReducedMoneyProduction(0)).toEqual(0);
    expect(findStepForReducedMoneyProduction(1)).toEqual(0);
    expect(findStepForReducedMoneyProduction(2)).toEqual(0);
    expect(findStepForReducedMoneyProduction(3)).toEqual(0);
    expect(findStepForReducedMoneyProduction(4)).toEqual(1);
    expect(findStepForReducedMoneyProduction(21)).toEqual(16);
    expect(findStepForReducedMoneyProduction(22)).toEqual(16);
    expect(findStepForReducedMoneyProduction(65)).toEqual(57);
  })
});
