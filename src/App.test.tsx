import { MoneyProductionStepMap, createMoneyProductionStepMap } from './App';

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
