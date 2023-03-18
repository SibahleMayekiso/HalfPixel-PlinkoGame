export class GameScoreSystem {
    constructor(totalPoints, totalScore) {
        this._totalPlayerPoints = totalPoints;
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
        if (bucketNumber == 1 || bucketNumber == 5) {
            this._totalPlayerScore = currentScore + 10;
            return this._totalPlayerScore;
        }
        else if (bucketNumber == 2 || bucketNumber == 4) {
            this._totalPlayerScore = currentScore + 5;
            return this._totalPlayerScore;
        }
        else {
            this._totalPlayerScore = currentScore + 2;
            return this._totalPlayerScore;
        }
    }
}
