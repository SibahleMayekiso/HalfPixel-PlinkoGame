"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScoreSystem = void 0;
class GameScoreSystem {
    constructor(totalCoins, totalScore) {
        this._totalPlayerPoints = totalCoins;
        this._totalPlayerScore = totalScore;
    }
    UpdatePoints() {
        this._totalPlayerPoints--;
        return this._totalPlayerPoints;
    }
    GetCurrentScore() {
        return this._totalPlayerScore;
    }
    UpdateScore(currentScore, bucketNumber) {
        switch (bucketNumber) {
            case 1:
                this._totalPlayerScore = currentScore + 1;
                return this._totalPlayerScore;
            case 2:
                this._totalPlayerScore = currentScore + 2;
                return this._totalPlayerScore;
            case 3:
                this._totalPlayerScore = currentScore + 3;
                return this._totalPlayerScore;
            case 4:
                this._totalPlayerScore = currentScore + 4;
                return this._totalPlayerScore;
            case 5:
                this._totalPlayerScore = currentScore + 5;
                return this._totalPlayerScore;
            default:
                break;
        }
    }
}
exports.GameScoreSystem = GameScoreSystem;