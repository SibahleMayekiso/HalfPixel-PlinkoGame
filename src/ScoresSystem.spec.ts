import { GameScoreSystem } from "./ScoreSystem";

const scoreSystem = new GameScoreSystem(10, 0);

describe("UpdateScore", () => {

    test("should return 1 given UpdateScore(0,3)", () => {
        expect(scoreSystem.UpdateScore(scoreSystem.GetCurrentScore(), 3)).toBe(1);
    })
})