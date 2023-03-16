"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScoreSystem_1 = require("./ScoreSystem");
describe("UpdateScore", () => {
    test("should return 1 given UpdateScore(0,1)", () => {
        //Arrange
        const scoreSystem = new ScoreSystem_1.GameScoreSystem(10, 0);
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
        const scoreSystem = new ScoreSystem_1.GameScoreSystem(10, 0);
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
        const scoreSystem = new ScoreSystem_1.GameScoreSystem(10, 0);
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
        const scoreSystem = new ScoreSystem_1.GameScoreSystem(10, 0);
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
        const scoreSystem = new ScoreSystem_1.GameScoreSystem(10, 0);
        const expectedResult = 5;
        const bucketNumber = 5;
        const currentScore = 0;
        //Act
        const actualResult = scoreSystem.UpdateScore(currentScore, bucketNumber);
        //Assert
        expect(actualResult).toEqual(expectedResult);
    });
});
