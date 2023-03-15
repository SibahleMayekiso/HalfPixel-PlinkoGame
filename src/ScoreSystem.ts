class GameScoreSystem {
    _totalPlayerPoints: number;
    _totalPlayerScore: number;

    constructor(totalCoins: number, totalScore: number) {
        this._totalPlayerPoints = totalCoins;
        this._totalPlayerScore = totalScore
    }

    UpdatePoints(){
        this._totalPlayerPoints--;

        return this._totalPlayerPoints;
    }

    GetCurrentScore(){
        return this._totalPlayerScore;
    }

    UpdateScore(currentScore: number, bucketNumber: number){
        switch (bucketNumber) {
            case 1:
                this._totalPlayerScore = currentScore + 10;
            
                return this._totalPlayerScore;

            case 2:
                this._totalPlayerScore += 10;
            
                return this._totalPlayerScore;

            case 3:
                this._totalPlayerScore += 10;
            
                return this._totalPlayerScore;

            case 4:
                this._totalPlayerScore += 10;
            
                return this._totalPlayerScore;

            case 5:
                this._totalPlayerScore += 10;
            
                return this._totalPlayerScore;
        
            default:
                break;
        }
    }
}

export { GameScoreSystem };