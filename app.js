import * as PIXI from "./node_modules/pixi.js/dist/pixi.mjs";

const app = new PIXI.Application({
  width: 500,
  height: 600,
  backgroundColor: 0x0a000f,
});

document.body.appendChild(app.view);

//prettier-ignore
const gameBoardMap = [
    [' ', ' ', ' ', ' ', ' ', '0', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' '],
    [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
  ];

const container = new PIXI.Container();
app.stage.addChild(container);

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
              .drawCircle(
                boardMidpointXaxis + 50 * rowIndex,
                this._height / 6,
                15
              )
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
              .lineStyle(5, 0x4B0008)
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



class GameAsset {
  static velocityX = 0;
  static velocityY = 0;

  constructor(positionX, positionY) {
    this._positionX = positionX;
    this._positionY = positionY;
  }

  GeneratePuck() {
    const coinPuck = PIXI.Sprite.from('./assets/Coin Pack/Coin9.png')
    container.addChild(coinPuck);

    coinPuck.width = 25;
    coinPuck.height = 25;

    coinPuck.x = this.positionX;
    coinPuck.y = this.positionY;
  }

  UpdatePosition() {
    GameAsset.velocityX++;
    GameAsset.velocityY++;

    this.positionX = 238;
    this.positionY = 100 + GameAsset.velocityY * 10;

    console.log(`xAxis: ${this.positionX}, yAxis: ${this.positionY}`);

    this.GeneratePuck();
  }
}

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = PIXI.Sprite.from('./assets/vecteezy_start-button.png')
container.addChild(startButtonSprite);

startButtonSprite.width = 150;
startButtonSprite.height = 75;

startButtonSprite.x = 175;

startButtonSprite.interactive = true;

const asset = new GameAsset(250, 100);

startButtonSprite.on('pointerdown', () => {
  setInterval(GameLoop, 1000 / 5);
})

let score = 0;

function GameLoop() {
  if (asset._positionY < app.screen.height) {
    score++
    document.getElementById("player-score").innerHTML = `Score : ${score}`
    asset.UpdatePosition();

  }
}