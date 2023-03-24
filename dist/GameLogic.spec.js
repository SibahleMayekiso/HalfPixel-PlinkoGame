import { PreDetermineBucketToLandIn } from "./GameLogic.js";
describe("PreDetermineBucketToLandIn", () => {
    test("should return a number between 1 and 5", () => {
        //Arrange
        const numberLowerBound = 1;
        const numberUpperBound = 5;
        //Action
        const actualResult = PreDetermineBucketToLandIn();
        //Assert
        expect(actualResult).toBeLessThanOrEqual(numberUpperBound);
        expect(actualResult).toBeGreaterThanOrEqual(numberLowerBound);
    });
});
