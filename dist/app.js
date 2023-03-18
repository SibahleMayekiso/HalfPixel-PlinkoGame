import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { CalculateNavigationPath, PreDetermineBucketToLandIn } from "./GameLogic.js";
import { GameScoreSystem } from "./ScoreSystem.js";
const app = new PIXI.Application({
    width: 500,
    height: 600,
    backgroundColor: 0x0a000f,
});
document.body.appendChild(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);
//prettier-ignore
const gameBoardMap = [
    [' ', ' ', ' ', ' ', ' ', '0', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' '],
    [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
];
class GameBoard {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    SetUpGameBoard() {
        const boardMidpointXaxis = this._width / 2;
        gameBoardMap.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                switch (column) {
                    case "0":
                        const hole = new PIXI.Graphics()
                            .beginFill(0xdddddd)
                            .drawCircle(boardMidpointXaxis + 50 * rowIndex, this._height / 6, 15)
                            .endFill();
                        container.addChild(hole);
                        break;
                    case "*":
                        const pin = new PIXI.Graphics()
                            .beginFill(0xffffff)
                            .drawCircle(50 * columnIndex, 100 + 50 * rowIndex, 5)
                            .endFill();
                        container.addChild(pin);
                        break;
                    case "_":
                        const bucket = new PIXI.Graphics()
                            .beginFill(0xf0d020)
                            .lineStyle(5, 0x4b0008)
                            .drawRect(50 * columnIndex - 25, 100 + 50 * rowIndex, 50, 50, 2)
                            .endFill();
                        container.addChild(bucket);
                        break;
                    default:
                        break;
                }
            });
        });
    }
}
const coinPuck = PIXI.Sprite.from("./assets/Coin Pack/Coin9.png");
class GameAsset {
    constructor(positionX, positionY) {
        this._positionX = positionX;
        this._positionY = positionY;
    }
    GeneratePuck() {
        coinPuck.anchor.set(0.5);
        coinPuck.width = 25;
        coinPuck.height = 25;
        coinPuck.x = this._positionX;
        coinPuck.y = this._positionY;
        container.addChild(coinPuck);
    }
    MovePosition() {
        coinPuck.x = this._positionX;
        coinPuck.y = this._positionY;
    }
    ResetPostion() {
        this._positionX = 250;
        this._positionY = 100;
    }
}
const board = new GameBoard(500, 600);
board.SetUpGameBoard();
const startButtonSprite = CreateStartButton();
const asset = new GameAsset(250, 100);
const scoreState = new GameScoreSystem(10, 0);
startButtonSprite.on("pointerdown", () => {
    asset.ResetPostion();
    if (scoreState._totalPlayerPoints <= 0) {
        container.removeChild(coinPuck);
        console.log("Game Over! Insufficient Coins");
        document.getElementById("player-coins").style.color = "red";
        startButtonSprite.interactive = false;
    }
    else {
        const bucketNumber = PreDetermineBucketToLandIn();
        const path = CalculateNavigationPath(bucketNumber);
        let currentScore = scoreState.GetCurrentScore();
        scoreState.UpdateScore(currentScore, bucketNumber);
        scoreState.UpdatePoints();
        MovePuckOnPath(path);
        document.getElementById("player-score").innerHTML = `Score : ${scoreState._totalPlayerScore}`;
        document.getElementById("player-coins").innerHTML = `Coins : ${scoreState._totalPlayerPoints}`;
        setInterval(GameLoop, 1000 / 60);
    }
});
function CreateStartButton() {
    const startButtonSprite = PIXI.Sprite.from("./assets/vecteezy_start-button.png");
    startButtonSprite.width = 150;
    startButtonSprite.height = 75;
    startButtonSprite.x = 175;
    startButtonSprite.interactive = true;
    container.addChild(startButtonSprite);
    return startButtonSprite;
}
function GameLoop() {
    if (scoreState._totalPlayerPoints < 0) {
        container.removeChild(coinPuck);
    }
}
function MovePuckOnPath(path) {
    asset.GeneratePuck();
    path.forEach((element, index) => {
        setTimeout(() => {
            let axisValues = element.split(";");
            asset._positionX = Number.parseInt(axisValues[0]);
            asset._positionY = Number.parseInt(axisValues[1]);
            asset.MovePosition();
        }, 1000 * index);
    });
}
