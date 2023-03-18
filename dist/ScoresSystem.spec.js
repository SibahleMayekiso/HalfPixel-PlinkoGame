import { GameScoreSystem } from "./ScoreSystem";
describe("UpdateScore", () => {
    test("should return 1 given UpdateScore(0,1)", () => {
        //Arrange
        const scoreSystem = new GameScoreSystem(10, 0);
        const expectedResult = 1;
        const bucketNumber = 1;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
    test("should return 2 given UpdateScore(0,2)", () => {
        //Arrange
        const scoreSystem = new GameScoreSystem(10, 0);
        const expectedResult = 2;
        const bucketNumber = 2;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
    test("should return 3 given UpdateScore(0,3)", () => {
        //Arrange
        const scoreSystem = new GameScoreSystem(10, 0);
        const expectedResult = 3;
        const bucketNumber = 3;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
    test("should return 4 given UpdateScore(0,4)", () => {
        //Arrange
        const scoreSystem = new GameScoreSystem(10, 0);
        const expectedResult = 4;
        const bucketNumber = 4;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
    test("should return 5 given UpdateScore(0,5)", () => {
        //Arrange
        const scoreSystem = new GameScoreSystem(10, 0);
        const expectedResult = 5;
        const bucketNumber = 5;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
});
describe("UpdatePoints", () => {
    test("should return 9 for UpdatePoints() given GameScoreSystem(10, 0)", () => {
        //Arrange
        const expectedResult = 9;
        const currentScore = 10;
        const scoreSystem = new GameScoreSystem(currentScore, 0);
        //Act
        const actualResult = scoreSystem.UpdatePoints();
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
});
